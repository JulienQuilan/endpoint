import Helmet from 'react-helmet';
import React from 'react';
import test from 'tape';

import About from '../../../../src/client/app/components/about';
import mountWithStyletron from '../../util/mount-with-styletron';

test('About page is rendered', (t) => {
  // There's really not much to test; this component is purely presentational.
  const about = mountWithStyletron(
    <About />
  );

  t.equal(about.find(Helmet).props().title, 'about - endpoint', 'Page title is correct');

  t.end();
});
