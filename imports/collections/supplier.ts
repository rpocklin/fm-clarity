import { MongoObservable } from 'meteor-rxjs';

import { Supplier } from '../models/supplier';

export const Suppliers = new MongoObservable.Collection<Supplier>('suppliers');
