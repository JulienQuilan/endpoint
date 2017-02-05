import React from 'react';

import {BackgroundColor} from '../../../styles/colors';
import {Margin} from '../../../styles/margin';

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
        {children}
      </Margin>
    </Margin>
  </BackgroundColor>
);

export default Container;
