import { Meteor } from 'meteor/meteor';

import { WorkOrders } from '../../../imports/collections/work-order';

Meteor.publish('workOrderList', function() {
  return WorkOrders.find({});
});
