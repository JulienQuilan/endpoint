import {styled} from 'styletron-react';

import {colors} from './colors';

export const sizes = {
  alpha: '60px',
  beta: '54px',
  delta: '36px',
  epsilon: '18px',
  gamma: '15px',
  iota: '13px',
  kilo: '12px',
  lambda: '10px'
};

/**
 * Parameterized factory function for generating style objects with the primary font.
 *
 * @param {String} size Name of the font size, or a literal font size.
 * @param {String} color Name of the color, or a literal hex color ode.
 * @param {Boolean} bold True to use the bold font family; false otherwise.
 */
export const primaryFontStyle = (size = 'iota', color = 'gray80', bold = false) => ({
  fontFamily: bold ? 'dejavu-sans-mono--bold' : 'dejavu-sans-mono--regular',
  fontSize: sizes[size] || size,
  color: colors[color] || color
});

/**
 * Component for a styled paragraph element.
 */
export const Primary = styled('p',
  ({bold, size = 'iota', color = 'gray80'}) => primaryFontStyle(size, color, bold));
