import range from 'range';
import {styled} from 'styletron-react';

const gray = {
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  transparent: 'rgba(0, 0, 0, 0.4)',
  // Shades of gray for each fifth percentage
  ...range.range(5, 100, 5).reduce((grayShades, shadePercent) => {
    const calcGrayRGB = (percentage) => 255 - Math.round(255 * (percentage / 100));

    const grayShade = calcGrayRGB(shadePercent);
    grayShades[`gray${shadePercent}`] = `rgb(${grayShade}, ${grayShade}, ${grayShade})`;
    return grayShades;
  }, {})
};

const others = {
  lightGreen: '#e8f5e9',
  green: '#388e3c',
  lightRed: '#ffebee',
  red: '#d32f2f',
  lightBlue: '#d6ecf5',
  blue: '#3eb8f0',
  darkBlue: '#036996',
  lightOrange: '#e69f97',
  orange: '#e74c3c',
  yellow: '#b49b5c',
  lightYellow: '#fcf8e3',
  lightPurple: '#d8bce8',
  purple: '#9b59b6',
  darkPurple: '#8e44ad'
};

const primary = {
  primary: others.purple,
  primaryLight: others.lightPurple,
  primaryDark: others.darkPurple
};

export const colors = {...gray, ...others, ...primary};

/**
 * Component specifying a background color.
 */
export const BackgroundColor = styled('div', ({color}) => ({
  backgroundColor: colors[color] || color
}));

/**
 * Component specifying text color.
 */
export const Color = styled('div', ({color}) => ({
  color: colors[color] || color
}));
