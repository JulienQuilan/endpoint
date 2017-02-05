/* global global */

import React from 'react';
import {mount} from 'enzyme';
import {StyletronProvider} from 'styletron-react';

/**
 * All components making use of Styletron styled components need to be wrapped in a
 * StyletronProvider to supply the `styletron` object context. This serves as a wrapper around
 * Enzyme's native `mount`, supplying a StyletronProvider as a wrapping parent component.
 *
 * @param {XML} component React component otherwise passed directly to mount.
 * @returns {Object} Enzyme-mounted component.
 */
function mountWithStyletron(component) {
  // global.styletron is defined during the jsdom initialization process.
  return mount(
    <StyletronProvider styletron={global.styletron}>
      {component}
    </StyletronProvider>
  );
}

export default mountWithStyletron;
