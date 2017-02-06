/* global document */

import bash from 'highlight.js/lib/languages/bash';
import {injectStyle} from 'styletron-utils';
import js from 'highlight.js/lib/languages/javascript';
import React from 'react';
import {registerLanguage} from 'react-syntax-highlighter/dist/light';
import Raven from 'raven-js';
import {Router, browserHistory} from 'react-router';
import Styletron from 'styletron-client';
import {StyletronProvider} from 'styletron-react';

import routes from './routes';
import secrets from '../config/secrets';

// Client-side Sentry initialization
Raven.config(secrets.sentryDSN).install();

// Syntax highlighting initialization
registerLanguage('bash', bash);
registerLanguage('javascript', js);

// Styletron initialization
const stylesheet = document.createElement('style');
document.head.appendChild(stylesheet);
const styletron = new Styletron([stylesheet]);

export const style = (styleObject) => injectStyle(styletron, styleObject);

/**
 * Main application parent component.
 *
 * @constructor
 */
const App = () => (
  <StyletronProvider styletron={styletron}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </StyletronProvider>
);

export default App;
