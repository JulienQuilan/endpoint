/* global global, document, window */

import jsdom from 'jsdom';
import Raven from 'raven-js';
import sinon from 'sinon';
import Styletron from 'styletron-client';

function setupDom() {
  global.document = jsdom.jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
  global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

  // Styletron initialization
  const stylesheet = global.document.createElement('style');
  global.document.head.appendChild(stylesheet);
  global.styletron = new Styletron([stylesheet]);

  // Raven stub
  sinon.stub(Raven, 'config').returns({install: () => {}});
}

setupDom();
