import React from 'react';

import {BackgroundColor, colors} from '../../../styles/colors';
import {Margin, marginStyle, spacing} from '../../../styles/margin';
import {primaryFontStyle} from '../../../styles/fonts';

const ALERT_TYPE_INFO = 'alertTypeInfo';
const ALERT_TYPE_SUCCESS = 'alertTypeSuccess';
const ALERT_TYPE_WARN = 'alertTypeWarn';
const ALERT_TYPE_ERROR = 'alertTypeError';

export const InfoAlert = (props) => <Alert type={ALERT_TYPE_INFO} {...props} />;
export const ErrorAlert = (props) => <Alert type={ALERT_TYPE_ERROR} {...props} />;
export const SuccessAlert = (props) => <Alert type={ALERT_TYPE_SUCCESS} {...props} />;
export const WarningAlert = (props) => <Alert type={ALERT_TYPE_WARN} {...props} />;

/**
 * Alert banner component.
 */
export default class Alert extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneOf([
      ALERT_TYPE_INFO,
      ALERT_TYPE_SUCCESS,
      ALERT_TYPE_WARN,
      ALERT_TYPE_ERROR
    ]),
    title: React.PropTypes.string,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ])
  };
  static defaultProps = {
    type: ALERT_TYPE_INFO
  };

  render() {
    const {type, title, message, ...props} = this.props;
    const alertColors = {
      [ALERT_TYPE_INFO]: {bg: colors.lightBlue, text: colors.blue},
      [ALERT_TYPE_SUCCESS]: {bg: colors.lightGreen, text: colors.green},
      [ALERT_TYPE_WARN]: {bg: colors.lightYellow, text: colors.yellow},
      [ALERT_TYPE_ERROR]: {bg: colors.lightRed, text: colors.red}
    };

    return (
      <Margin size="large" bottom {...props}>
        <BackgroundColor
          color={alertColors[type].bg}
          style={{
            padding: `${spacing.small} ${spacing.default}`
          }}
        >
          <span style={marginStyle('small', 'right')}>
            <span style={primaryFontStyle('iota', alertColors[type].text, 'bold')}>
              {title}
            </span>
          </span>
          <span style={primaryFontStyle('iota', alertColors[type].text)}>
            {message}
          </span>
        </BackgroundColor>
      </Margin>
    );
  }
}
