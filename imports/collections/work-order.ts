import { MongoObservable } from 'meteor-rxjs';

import { WorkOrder } from '../models/work-order';

export const WorkOrders = new MongoObservable.Collection<WorkOrder>('work-orders');
