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
const Footer = ({win}) => {
  const StyledFooter = styled('div', {
    bottom: '0',
    width: '100%',
    ...((win.height <= 800) && marginStyle('huge', 'top')),
    ...((win.height > 800) && {height: '40px', position: 'fixed'})
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
