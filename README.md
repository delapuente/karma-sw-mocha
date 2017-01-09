# karma-sw-mocha
A Karma plug-in, framework for Mocha testing when running inside a ServiceWorker.

## What is Karma SW Mocha for?
Karma SW Mocha should be employed for performing tests in a [ServiceWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope) and not in a window environment. It is not to test interceptions, nor performing integration tests between your client code and your service worker. It will simply run your code inside a special service worker and will warry about comunicating the results of the testing to the Karma reporter.

## Installation
Install karma-sw-mocha from npm:

```bash
$ npm install --save karma-sw-mocha
```

And add it as the first item of your framework list in the Karma configuration file...

```js
{
  frameworks: ['sw-mocha', /* other frameworks... */],
}
```

Notice the name of the framework is **`sw-mocha`** and not `karma-sw-mocha`.

You'll probably need to adjust the `files` entry. As Karma does not support SW natively, it can not automatically add the additional scripts you want for your service workers. In order to avoid them to be included as `&lt;script&gt;` tags, modify the `files` entry to become:

{
  files: [
    {pattern: 'path/to/service-worker/includes/**/*.js', included: false}
  ]
}

### Adding tests
For the service worker to know which test files should load, you need to add them to the client configuration as well as the files array in the config. This is because the framework loads these files within the service worker directly, and does not have access to the main files list:

**Please remember to include the service worker that you want to test as the first script to be loaded in here.**

```js
client: {
    'sw-mocha': {
        SW_TESTS: [
            'path/to/your/worker/sw.js',
            'samples/mocha-sinon-chai-bdd/sw-tests.js'
        ]
    }
},
```

### Loading other libraries
A testing framework is usually insufficient to provide an efficient testing environment. You usually will need an assertion library like [Chai](http://chaijs.com/) and a spy / mock library as [Sinon](http://sinonjs.org/). You can install Karma versions of these libraries with:

```bash
$ npm install --save sinon chai karma-sinon karma-chai
```

To include them in your service worker setup, edit `sw-tests.js` and import the proper scripts there:

```js
// sw-tests.js
importScripts('/base/node_modules/chai/chai.js');
importScripts('/base/node_modules/sinon/pkg/sinon.js');
```

Don't forget to add these frameworks to your Karma configuration, **after `sw-mocha`**:

```js
{
  frameworks: ['sw-mocha', 'sinon', 'chai']
}
```

### Configuring mocha and running custom setup code
The file `sw-tests.js` will be load before executing any test so you can add there the code for [loading custom scripts](#loading-other-libraries) and your own custom synchronous setup code. For instance, you could instruct mocha to enable `BDD` API and make [Chai's `expect()`](http://chaijs.com/api/bdd/) globally available:

```js
// sw-tests.js
importScripts('/base/node_modules/chai/chai.js');
// any other imports, not your tests...

mocha.setup({ ui: 'bdd' });
self.expect = chai.expect;
```

## Configuration example

In [`samples/mocha-sinon-chai-bdd`](https://github.com/delapuente/karma-sw-mocha/tree/master/samples/mocha-sinon-chai-bdd) you will find sample files for the Karma configuration file and `sw-tests.js` to set and Mocha BDD + Chai + Sinon environment up.

## Browser support
At the time of writing, Chrome, Firefox, Opera and Samsung Internet support service workers. See this [compatibility table](https://jakearchibald.github.io/isserviceworkerready/) for the most up to date information. **PhantomJS** is not supported and is highly unlikely to ever be supported.

For headless support, try [SlimerJS](https://github.com/laurentj/slimerjs) ([runner](https://github.com/karma-runner/karma-slimerjs-launcher)) or, if you're feeling lucky, [Raw Chromium for Linux](https://download-chromium.appspot.com/) with --headless and --disable-gpu flags set. Track the Chrome Headless project [here](https://bugs.chromium.org/p/chromium/issues/detail?id=546953)
