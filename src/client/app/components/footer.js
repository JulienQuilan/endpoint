import React from 'react';
import {styled} from 'styletron-react';

import {marginStyle} from '../../styles/margin';
import {primaryFontStyle} from '../../styles/fonts';

import Link from './ui/link';

/**
 * Universal footer element with generic links.
 *
 * @returns {XML} React element.
 * @constructor
 */
const Footer = () => {
  const StyledFooter = styled('div', {
    bottom: '0',
    height: '40px',
    position: 'fixed',
    width: '100%'
  });

  return (
    <StyledFooter>
      <span style={marginStyle('default', 'right')}>
        <Link
          to="/about"
          style={primaryFontStyle('kilo', null)}
        >
          about
        </Link>
      </span>

      <Link
        href="https://github.com/LINKIWI/endpoint"
        style={primaryFontStyle('kilo', null)}
      >
        github
      </Link>
    </StyledFooter>
  );
};

export default Footer;
