import './imports/publications/messages';
import './imports/publications/suppliers';
import './imports/publications/work-orders';

import { Suppliers } from 'imports/collections/supplier';
import { Messages } from 'imports/collections/message';
import { WorkOrderPriority } from 'imports/models/work-order';
import { WorkOrders } from 'imports/collections/work-order';

const moment = require('moment');

export const seedDB = () => {

    console.log('Seeding local database...');

    const coffeeSupplierId = Suppliers.insert({
        name: 'Caffenatics',
        services: ['coffee', 'beans'],
        number: 2
    });

    const ikeaSupplierId = Suppliers.insert({
        name: 'Ikea',
        services: ['furniture', 'meat balls', 'kitchenware', 'office'],
        number: 3
    });

    const plumbingSupplierId = Suppliers.insert({
        name: 'Reece Plumbing',
        services: ['water', 'heating', 'cooling'],
        number: 1
    });

    // all completed jobs late
    plumbingSupplierId.subscribe((supplierId: string) => {

        Messages.insert({
            supplierId,
            numberReceived: 58,
            numberSent: 21
        });

        WorkOrders.insert({
            supplierId,
            name: 'deliver copper',
            priority: WorkOrderPriority.MEDIUM,
            dueDate: moment().add(7, 'days').toDate()
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver coffeexxx',
            priority: WorkOrderPriority.MEDIUM,
            dueDate: moment().add(7, 'days').toDate()
        });        
        WorkOrders.insert({
            supplierId,
            name: 'deliver tap',
            priority: WorkOrderPriority.HIGH,
            dueDate: moment().add(6, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver sink',
            priority: WorkOrderPriority.HIGH,
            dueDate: moment().add(6, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver beer',
            priority: WorkOrderPriority.LOW,
            dueDate: moment().add(6, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver heating',
            priority: WorkOrderPriority.LOW,
            dueDate: moment().add(6, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
    });

    // // all completed on time
    coffeeSupplierId.subscribe((supplierId: string) => {

        Messages.insert({
            supplierId,
            numberReceived: 333,
            numberSent: 666
        });

        WorkOrders.insert({
            supplierId,
            name: 'deliver coffee',
            priority: WorkOrderPriority.MEDIUM,
            dueDate: moment().add(7, 'days').toDate()
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver beans',
            priority: WorkOrderPriority.HIGH,
            dueDate: moment().add(10, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver coffee machine',
            priority: WorkOrderPriority.HIGH,
            dueDate: moment().add(10, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver tea',
            priority: WorkOrderPriority.LOW,
            dueDate: moment().add(10, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver grinder',
            priority: WorkOrderPriority.LOW,
            dueDate: moment().add(10, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
    });

    // mixed completed jobs (early and late)
    ikeaSupplierId.subscribe((supplierId: string) => {

        Messages.insert({
            supplierId,
            numberReceived: 100,
            numberSent: 100
        });

        WorkOrders.insert({
            supplierId,
            name: 'deliver office lights',
            priority: WorkOrderPriority.MEDIUM,
            dueDate: moment().add(7, 'days').toDate()
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver meatballs',
            priority: WorkOrderPriority.HIGH,
            dueDate: moment().add(5, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver chairs',
            priority: WorkOrderPriority.HIGH,
            dueDate: moment().add(5, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver office desk',
            priority: WorkOrderPriority.LOW,
            dueDate: moment().add(10, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
        WorkOrders.insert({
            supplierId,
            name: 'deliver cupboard',
            priority: WorkOrderPriority.LOW,
            dueDate: moment().add(10, 'days').toDate(),
            completedDate: moment().add(7, 'days').toDate(),
        });
    });
}
