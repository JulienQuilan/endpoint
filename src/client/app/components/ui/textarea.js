import React from 'react';

import {colors} from '../../../styles/colors';
import {primaryFontStyle} from '../../../styles/fonts';
import {style} from '../../app';
import {transition} from '../../../styles/general';

/**
 * A styled text input entry field.
 */
export default class TextArea extends React.Component {
  /**
   * Retrieve the current value of the input field.
   *
   * @returns {String} The current value of the input field.
   */
  getValue() {
    return this.textarea.value;
  }

  render() {
    const {size, color, bold, ...props} = this.props;

    const className = style({
      backgroundColor: colors.gray5,
      border: 'none',
      borderBottom: `1px solid ${colors.primaryLight}`,
      height: '200px',
      opacity: '0.7',
      padding: '3px 1px',
      transition,
      width: '100%',
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
      <textarea
        ref={(elem) => {
          this.textarea = elem;
        }}
        className={className}
        {...props}
      />
    );
  }
}
