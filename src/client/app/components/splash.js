/* global window */

import React from 'react';
import SquareLoader from 'halogen/SquareLoader';

import {colors} from '../../styles/colors';
import {transition} from '../../styles/general';

/**
 * Full-screen splash component used as a loading indicator.
 */
export default class Splash extends React.Component {
  constructor() {
    super();

    this.state = {opacity: '0'};
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    const {opacity} = this.state;

    this.timeout = window.setTimeout(() => this.setState({opacity: '0.7'}), 100);

    return (
      <div
        style={{
          backgroundColor: colors.white,
          display: 'block',
          height: '100vh',
          opacity,
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          ...transition()
        }}
      >
        <div
          style={{
            left: '50%',
            position: 'fixed',
            transform: 'translateX(-50%) translateY(-50%)',
            top: '50%',
            zIndex: 2
          }}
        >
          <SquareLoader color={colors.primary} />
        </div>
      </div>
    );
  }
}
