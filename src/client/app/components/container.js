import React from 'react';

import {BackgroundColor} from '../../styles/colors';
import Footer from './footer';
import Header from './header';
import {Margin} from '../../styles/margin';

/**
 * Container element providing border margins, wrapping all children on a page.
 *
 * @param {XML} children All enclosed children.
 * @constructor
 */
const Container = ({children}) => (
  <BackgroundColor color="white">
    <Margin size="huge" top bottom>
      <Margin size="enormous" left right>
        <Header />
        {children}
        <Footer />
      </Margin>
    </Margin>
  </BackgroundColor>
);

export default Container;
