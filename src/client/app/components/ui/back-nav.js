import {browserHistory} from 'react-router';
import KeyboardBackspace from 'react-icons/lib/md/keyboard-backspace';
import React from 'react';
import {styled} from 'styletron-react';

import {colors} from '../../../styles/colors';
import {Margin, MarginInline} from '../../../styles/margin';
import {PrimaryInline} from '../../../styles/fonts';
import {transition} from '../../../styles/general';

const StyledBackNav = styled('div', {
  color: colors.primary,
  cursor: 'pointer',
  opacity: '0.7',
  transition,
  ':hover': {
    opacity: '1.0'
  },
  ':focus': {
    opacity: '1.0'
  }
});

/**
 * Back arrow for reverse history navigation. Effectively, provides a UI component for programmatic
 * invocation of the browser's back button.
 */
const BackNav = () => (
  <Margin bottom onClick={browserHistory.goBack}>
    <StyledBackNav>
      <MarginInline right>
        <KeyboardBackspace />
      </MarginInline>

      <PrimaryInline size="kilo" color={null} bold>
        GO BACK
      </PrimaryInline>
    </StyledBackNav>
  </Margin>
);

export default BackNav;
