import isArray from 'is-array';
import {styled} from 'styletron-react';

export const spacing = {
  default: '24px',
  tiny: '6px',
  small: '12px',
  large: '36px',
  huge: '50px',
  enormous: '100px'
};

/**
 * Factory function for generating a margin style object of the specified size, for the specified
 * dimension(s).
 *
 * @param {String} size Name of the spacing size.
 * @param {String|Array} dimensions A single dimension on which to apply the style, or an array of
 *                                  dimensions, each of which has the spacing applied.
 * @returns {Object} Style object with the margins applied on the appropriate dimensions.
 */
export const marginStyle = (size = 'default', dimensions = ['all']) => {
  const forDimension = (dimension) =>
    ((isArray(dimensions) ? dimensions : [dimensions]).includes(dimension)) ? spacing[size] : '0';

  return {
    padding: [
      forDimension('top'),
      forDimension('right'),
      forDimension('bottom'),
      forDimension('left')
    ].join(' ')
  };
};

/**
 * Component for a div with the specified margins.
 */
export const Margin = styled('div', ({size = 'default', all, top, bottom, left, right}) =>
  marginStyle(size, [
    all && 'all',
    top && 'top',
    bottom && 'bottom',
    left && 'left',
    right && 'right'
  ].filter(Boolean)));
