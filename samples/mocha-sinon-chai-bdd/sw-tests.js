
// This is the set of the SW tests. They will be run inside a SW environment.
// Karma publishes the static content from /base/ path.
var SW_TESTS = [
  '/base/path/to/tests/test.sw-spec.js',
  // more tests...
];

// Import chai and sinon into the ServiceWorkerGlobalScope
importScripts('/base/node_modules/chai/chai.js');
importScripts('/base/node_modules/sinon/pkg/sinon.js');

// Setup mocha to be bdd and make chai.expect globally available
mocha.setup({ ui: 'bdd' });
self.expect = chai.expect;
