import React from 'react';
import {styled} from 'styletron-react';

import {colors} from '../../styles/colors';
import {Primary, primaryFontStyle} from '../../styles/fonts';
import {Margin} from '../../styles/margin';
import {transition} from '../../styles/general';

import browser from '../util/browser';

const title = 'endpoint';
const subtitle = 'super simple mock api endpoints for static json data';

/**
 * Universal header component.
 *
 * @constructor
 */
const Header = () => {
  const redirectToHome = () => browser.push('/');

  const Title = styled('span', {
    cursor: 'pointer',
    ':hover': {
      color: colors.primary
    },
    ...transition(),
    ...primaryFontStyle('delta')
  });

  return (
    <Margin size="huge" bottom>
      <Title className="title" onClick={redirectToHome}>
        {title}
      </Title>
      <Primary className="subtitle" size="epsilon" color="gray60">
        {subtitle}
      </Primary>
    </Margin>
  );
};

export default Header;
