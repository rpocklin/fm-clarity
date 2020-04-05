# FM Clarity

## Overview

This solves the supplied coding solution which ranks the suppliers based on the work orders
and messages for each supplier and will stay synchronised with the backend database.

## Tech Stack

This project uses the [Meteor framework](https://www.meteor.com/) and uses [Angular](https://angular.io/) on the frontend and MongoDB as the database.

## Usage
### Install

1.  Check out this repository by running `git clone git@github.com:rpocklin/fm-clarity.git` (required [Git](https://git-scm.com/) installed)
1.  Run `npm install` (requires [Node.js](https://nodejs.org/en/) installed)
1.  The first time run `meteor` (requires [Meteor](https://www.meteor.com/) installed) which will seed the local database.
1.  After the first time, run  `meteor --production` which skips seeding the database.  If you want to run `meteor` (in development mode) again clear the database first by running `meteor reset`.
1.  If you want to connect to the local database while running the project, you can connect to `mongodb://localhost:3001`.

### Run

For demo purposes, run `npm start` which will seed the local development MongoDB database fresh each time it's run and the browser to `http://localhost:3000/dashboard` to view the ranking dashboard.

## NPM Scripts

This project comes with predefined NPM scripts, defined in `package.json`:

- `$ npm run start` - Run the Meteor application.
- `$ npm run start:prod` - Run the Meteor application in production mode (requires separate DB)
- `$ npm run build` - Creates a Meteor build version under `./build/` directory.
- `$ npm run clear` - Resets Meteor's cache and clears the MongoDB collections.
- `$ npm run meteor:update` - Updates Meteor's version and it's dependencies.
- `$ npm run test` - Executes Meteor in test mode with Mocha.
- `$ npm run test:ci` - Executes Meteor in test mode with Mocha for CI (run once).

## Packages

This package contains:

- TypeScript support (with `@types`) and Angular 2 compilers for Meteor
- Angular-Meteor
- [Meteor-RxJS](http://angular-meteor.com/meteor-rxjs/) support and usage
- Angular (core, common, compiler, platform, router, forms)
- SASS, LESS, CSS support (Also support styles encapsulation for Angular 2)
- Testing framework with Mocha and Chai


### Server

The `server` folder contain single TypeScript (`.ts`) file which is the main file (`/server/main.ts`), and creates the main server instance, and the starts it.

All other server files should be located under `/server/imports`.

### Testing

The testing environment in this boilerplate based on [Meteor recommendation](https://guide.meteor.com/testing.html), and uses Mocha as testing framework along with Chai for assertion.


## Todo
1.  Extract calculations in `dashboard.component.ts` into a service with unit tests.
1.  Add proper DB migrations (and remove seeding out of `main.ts`)
1.  Do a better dashboard which transitions when it updates like a stock ticker.
1.  Add realtime graphs over time for top 10 ranking.
1.  Add top 3 in larger font above full 10 ranking.