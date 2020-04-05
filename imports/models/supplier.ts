export interface Supplier {
    _id?: string;
    name: string;
    number: number;
    services: string[];
}

export interface SupplierWithRanking extends Supplier {
  workOrderTotalWeighting: number;
  messagesRatioWeighting: number;
}