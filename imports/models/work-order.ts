export enum WorkOrderPriority {
    LOW = 3,
    MEDIUM = 2,
    HIGH = 1,
}

export interface WorkOrder {
    _id?: string;
    supplierId: string;
    name: string;
    dueDate: Date;
    completedDate?: Date;
    priority: WorkOrderPriority;
    reportProvided?: boolean;
}

export interface WorkOrderWithRatios extends WorkOrder {
  rating: number;
  weighting: number;
  isLate: boolean;
  isCompleted: boolean;
}