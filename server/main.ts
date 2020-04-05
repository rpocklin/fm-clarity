import { seedDB } from './db-seed';

if (!Meteor.isProduction) {
    seedDB();
}
