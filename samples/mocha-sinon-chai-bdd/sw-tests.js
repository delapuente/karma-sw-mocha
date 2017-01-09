
// Import chai and sinon into the ServiceWorkerGlobalScope
importScripts('/base/node_modules/chai/chai.js');
importScripts('/base/node_modules/sinon/pkg/sinon.js');

// Setup mocha to be bdd and make chai.expect globally available
mocha.setup({ ui: 'bdd' });
self.expect = chai.expect;
