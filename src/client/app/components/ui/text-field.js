import React from 'react';

import {colors} from '../../../styles/colors';
import {primaryFontStyle} from '../../../styles/fonts';
import {style} from '../../app';
import {transition} from '../../../styles/general';

/**
 * A styled text input entry field.
 */
export default class TextField extends React.Component {
  /**
   * Retrieve the current value of the input field.
   *
   * @returns {String} The current value of the input field.
   */
  getValue() {
    return this.input.value;
  }

  /**
   * Set the value of the input field.
   *
   * @param {String} text String to which the input value should be set.
   */
  setValue(text) {
    this.input.value = text;
  }

  render() {
    const {size, color, bold, ...props} = this.props;

    const className = style({
      border: 'none',
      borderBottom: `1px solid ${colors.primaryLight}`,
      opacity: '0.7',
      padding: '3px 1px',
      transition,
      ':hover': {
        opacity: '0.9'
      },
      ':focus': {
        opacity: '1.0',
        borderBottom: `1px solid ${colors.primary}`
      },
      ...primaryFontStyle(size, color, bold)
    });

    return (
      <input
        ref={(elem) => {
          this.input = elem;
        }}
        className={className}
        {...props}
      />
    );
  }
}
