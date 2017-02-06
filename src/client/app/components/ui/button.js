import React from 'react';
import {styled} from 'styletron-react';

import {colors} from '../../../styles/colors';
import {transition} from '../../../styles/general';

const noop = () => {};

/**
 * Styled button element.
 */
export default class Button extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };
  static defaultProps = {
    disabled: false,
    onClick: noop
  };

  render() {
    const {disabled, onClick, children, ...props} = this.props;

    const StyledButton = styled('button', {
      backgroundColor: colors.primary,
      border: 'none',
      cursor: 'pointer',
      opacity: disabled ? '0.4' : '0.85',
      padding: '10px 50px',
      pointerEvents: disabled ? 'none' : 'inherit',
      textDecoration: 'none',
      textTransform: 'uppercase',
      ':hover': {
        opacity: '1.0'
      },
      ':focus': {
        opacity: '1.0'
      },
      ':active': {
        opacity: '1.0'
      },
      '::-moz-focus-inner': {
        border: '0'
      },
      ...transition()
    });

    return (
      <StyledButton
        ref={(elem) => {
          this.button = elem;
        }}
        onClick={onClick}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
}
