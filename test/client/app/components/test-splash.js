import React from 'react';
import sinon from 'sinon';
import {SquareLoader} from 'halogen';
import test from 'tape';

import Splash from '../../../../src/client/app/components/splash';
import mountWithStyletron from '../../util/mount-with-styletron';

test('Splash fades in on mount', (t) => {
  const clock = sinon.useFakeTimers();
  const splash = mountWithStyletron(
    <Splash />
  );
  const wrapped = splash.find(Splash).node;

  t.equal(wrapped.state.opacity, '0', 'Opacity is initially zero');
  t.equal(splash.find(SquareLoader).length, 1, 'Preloader element is present');

  clock.tick(1000);

  t.equal(wrapped.state.opacity, '0.7', 'Opacity increases after a timeout');

  splash.unmount();

  clock.restore();
  t.end();
});
