import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, forkJoin, combineLatest, from, of, interval, zip } from 'rxjs';
import { withLatestFrom, groupBy, mergeMap, toArray, map, flatMap, mergeAll, concatAll, reduce } from 'rxjs/operators';

import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';

const moment = require('moment');

import { Message } from 'imports/models/message';
import { Supplier, SupplierWithRanking } from 'imports/models/supplier';
import { WorkOrder, WorkOrderPriority, WorkOrderWithRatios } from 'imports/models/work-order';

import { Messages } from 'imports/collections/message';
import { Suppliers } from 'imports/collections/supplier';
import { WorkOrders } from 'imports/collections/work-order';

interface Item {
  path: string,
  name: string
}

const SUPPLIER_RANKING_LENGTH = 10;
const DECIMAL_PLACES_PRECISION = 1;

const workOrderWeighting = [
  { priority: WorkOrderPriority.HIGH, weighting: 100 },
  { priority: WorkOrderPriority.MEDIUM, weighting: 60 },
  { priority: WorkOrderPriority.LOW, weighting: 30 }
];

@Component({
  selector: 'supplier-list',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public itemsList: Item[];

  public supplierNames: string;
  public rankedSuppliersList: SupplierWithRanking[];
  public suppliers: Observable<Supplier[]>;
  public suppliers$: Subscription;

  public workOrders: Observable<WorkOrder[]>;
  public workOrders$: Subscription;

  public messages: Observable<Message[]>;
  public messages$: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {

    this.suppliers = Suppliers.find();
    this.workOrders = WorkOrders.find();
    this.messages = Messages.find();

    this.suppliers$ = MeteorObservable.subscribe<Supplier>('supplierList').subscribe();
    this.workOrders$ = MeteorObservable.subscribe<WorkOrder>('workOrderList').subscribe();
    const ratioInputModels$: Observable<[Supplier[], WorkOrder[], Message[]]> = combineLatest(this.suppliers, this.workOrders, this.messages);

    this.messages$ = MeteorObservable.subscribe<Message>('messageList').subscribe(() => {
      this.messages = Messages.find();
    });

    // const orders: Observable<[Supplier[], WorkOrder[]]> = combineLatest(this.suppliers, this.workOrders);
    ratioInputModels$.subscribe((values: [Supplier[], WorkOrder[], Message[]]) => {
      const [suppliers, workOrders, messages] = values;

      if (!suppliers || !workOrders || !messages) {
        return;
      }

      if (!suppliers.length || !workOrders.length || !messages.length) {
        return;
      }

      const workOrdersWithRatios = this.calculateWorkOrderRatios(workOrders);
      const suppliersWithRanking = this.calculateSupplierRanking(suppliers, workOrdersWithRatios, messages);
      this.rankedSuppliersList = this.sortSuppliersWithRanking(suppliersWithRanking);
    });
  }

  calculateWorkOrderRatios(workOrders: WorkOrder[]): WorkOrderWithRatios[] {

    const workOrdersWithRatio = workOrders.map((workOrder: WorkOrder) => {

      const workOrderWithRatio = (workOrder as WorkOrderWithRatios);

      if (workOrder.completedDate) {
        const isLate = moment(workOrder.completedDate).isAfter(workOrder.dueDate);

        workOrderWithRatio.isLate = isLate;
        workOrderWithRatio.isCompleted = true;
      } else {
        workOrderWithRatio.isLate = false;
        workOrderWithRatio.isCompleted = false;
      }

      const priorityWeighting = workOrderWeighting.filter((priorityWeighting) =>
        priorityWeighting.priority === workOrderWithRatio.priority
      )[0];

      workOrderWithRatio.weighting = priorityWeighting.weighting;

      return workOrderWithRatio;
    });

    return workOrdersWithRatio;
  }


  calculateSupplierRanking(suppliers: Supplier[], workOrdersWithRatio: WorkOrderWithRatios[],
    messages: Message[]): SupplierWithRanking[] {

    const suppliersWithRanking: SupplierWithRanking[] = suppliers.map((supplier: Supplier) => {
      const supplierWithRanking = (supplier as SupplierWithRanking);

      const workOrdersForSupplier = workOrdersWithRatio.filter(workOrder => workOrder.supplierId === supplier._id);

      const lateCompletedWorkOrders = workOrdersForSupplier.filter(workOrder => workOrder.isLate && workOrder.isCompleted);
      const lateCompletedWorkOrdersWeighting = lateCompletedWorkOrders.reduce((result, workOrderWeighting) => result + workOrderWeighting.weighting, 0);

      const nonLateCompletedWorkOrders = workOrdersForSupplier.filter(workOrder => !workOrder.isLate && workOrder.isCompleted);
      const nonLateCompletedWorkOrdersWeighting = nonLateCompletedWorkOrders.reduce((result, workOrderWeighting) => result + workOrderWeighting.weighting, 0);

      supplierWithRanking.workOrderTotalWeighting = Number((nonLateCompletedWorkOrdersWeighting / (lateCompletedWorkOrdersWeighting || 1)).toFixed(DECIMAL_PLACES_PRECISION));

      const supplierMessages: Message = messages.filter(messages => messages.supplierId === supplier._id)[0];

      if (supplierMessages) {
        supplierWithRanking.messagesRatioWeighting = Number((supplierMessages.numberSent / (supplierMessages.numberReceived || 1)).toFixed(DECIMAL_PLACES_PRECISION));
      } else {
        supplierWithRanking.messagesRatioWeighting = 0;
      }

      return supplierWithRanking;
    });

    return suppliersWithRanking;
  }

  sortSuppliersWithRanking(suppliers: SupplierWithRanking[]) {

    const rankedSuppliersList = suppliers.sort((a, b) => {
      return b.workOrderTotalWeighting - a.workOrderTotalWeighting
        || b.messagesRatioWeighting - a.messagesRatioWeighting
    });

    return rankedSuppliersList;
  }

  ngOnDestroy() {
    if (this.suppliers$) {
      this.suppliers$.unsubscribe();
    }

    if (this.workOrders$) {
      this.workOrders$.unsubscribe();
    }

    if (this.messages$) {
      this.messages$.unsubscribe();
    }
  }

  public onClickDetails(path: string, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.router.navigate([`/dashboard/${path}`]);
  }
}
