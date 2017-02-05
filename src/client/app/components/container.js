import React from 'react';
import {withWindowState} from 'react-window-state';

import {BackgroundColor} from '../../styles/colors';
import Footer from './footer';
import Header from './header';
import {Margin} from '../../styles/margin';
import {spacing} from '../../styles/margin';

const sideMarginSize = (width) => {
  if (width < 350) {
    return spacing.default;
  }
  if (width < 600) {
    return spacing.huge;
  }
  return spacing.enormous;
};
const verticalMarginSize = (width) => {
  if (width < 350) {
    return spacing.default;
  }
  if (width < 600) {
    return spacing.large;
  }
  return spacing.huge;
};

/**
 * Container element providing border margins, wrapping all children on a page.
 *
 * @param {Object} win Object containing window width and height; supplied by HOC.
 * @param {XML} children All enclosed children.
 * @constructor
 */
const Container = ({win, children}) => (
  <BackgroundColor color="white">
    <Margin size={verticalMarginSize(win.width)} top bottom>
      <Margin size={sideMarginSize(win.width)} left right>
        <Header />
        {children}
        <Footer win={win} />
      </Margin>
    </Margin>
  </BackgroundColor>
);

export default withWindowState(Container);
