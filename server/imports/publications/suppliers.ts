import { Meteor } from 'meteor/meteor';

import { Suppliers } from '../../../imports/collections/supplier';

Meteor.publish('supplierList', function() {
  return Suppliers.find({});
});
