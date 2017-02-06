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
   * Retrieve the current value of the textarea.
   *
   * @returns {String} The current value of the textarea.
   */
  getValue() {
    return this.textarea.value;
  }

  /**
   * Set the value of the textarea.
   *
   * @param {String} text String to which the textarea value should be set.
   */
  setValue(text) {
    this.textarea.value = text;
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
      width: '100%',
      ':hover': {
        opacity: '0.9'
      },
      ':focus': {
        opacity: '1.0',
        borderBottom: `1px solid ${colors.primary}`
      },
      ...primaryFontStyle(size, color, bold),
      ...transition()
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
