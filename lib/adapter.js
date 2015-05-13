(function (window) {
  'use strict';

  function createSWMochaStartFn() {
    return function () {
      var iframe = document.createElement('IFRAME');
      iframe.id = 'sw-mocha-iframe';
      iframe.src = '/base/node_modules/karma-sw-mocha/lib/index.html';
      iframe.style.width = '100%';
      iframe.style.height = '0px';
      document.body.appendChild(iframe);
      iframe.onload = function() {
        setTimeout(function() {
          iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }, 1000);
      }
    };
  }

  window.__karma__.start = createSWMochaStartFn();
}(window));
