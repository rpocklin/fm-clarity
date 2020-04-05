import { Meteor } from 'meteor/meteor';

import { Messages } from '../../../imports/collections/message';

Meteor.publish('messageList', function() {
  return Messages.find({});
});
