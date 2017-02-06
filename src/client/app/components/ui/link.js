import {Link as RouterLink} from 'react-router';
import React from 'react';
import {styled} from 'styletron-react';

import {colors} from '../../../styles/colors';
import {transition} from '../../../styles/general';

/**
 * Styled link element, supporting both regular links and react-router browserHistory pushes.
 *
 * @param {Object} props Link properties. Specify property href for a regular link.
 * @returns {XML} React element.
 * @constructor
 */
const Link = (props) => {
  const {href, children} = props;

  const A = styled(href ? 'a' : RouterLink, {
    color: colors.primary,
    opacity: '0.8',
    textDecoration: 'none',
    ':link': {
      color: colors.primary
    },
    ':hover': {
      borderBottom: `2px solid ${colors.primary}`,
      opacity: '1.0'
    },
    ':active': {
      borderBottom: `2px solid ${colors.gray80}`,
      color: colors.gray80
    },
    ...transition()
  });

  return (
    <A {...props}>
      {children}
    </A>
  );
};

export default Link;
