import csjs from 'csjs-inject';
import Favicon from 'react-favicon';
import React from 'react';

/**
 * On client-side application initialization, inject global CSS styles into the document head.
 * WARNING: The operations taken by this function are *stateful* and *have side effects*. This
 * function should only be called once.
 */
function injectGlobalStyles() {
  /* eslint-disable no-unused-expressions */

  // Global styles
  csjs`
  * {
    margin: 0;
    outline: none;
    padding: 0;
  }
  `;

  // Font definitions
  csjs`
  @font-face {
    font-family: 'dejavu-sans-mono--regular';
    src: url('/static/fonts/deja-vu-sans-mono--regular.ttf');
  }

  @font-face {
    font-family: 'dejavu-sans-mono--bold';
    src: url('/static/fonts/deja-vu-sans-mono--bold.ttf');
  }
  `;

  /* eslint-enable no-unused-expressions */
}

injectGlobalStyles();

/**
 * Root application component wrapping the SPA. This is a stateless component; this component should
 * only be rendered once on the client.
 *
 * @param {XML} children All children components.
 * @constructor
 */
const AppRoot = ({children}) => (
  <div className="app-root">
    <Favicon
      animated={false}
      url={['/static/img/favicon.png']}
    />
    {children}
  </div>
);

export default AppRoot;
