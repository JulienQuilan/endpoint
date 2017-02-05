import {mount} from 'enzyme';
import React from 'react';
import test from 'tape';

import App from '../../../src/client/app/app';

test('Client-side app initialization', (t) => {
  const app = mount(
    <App />
  );

  t.equal(app.find('StyletronProvider').length, 1, 'StyletronProvider is initialized');
  t.ok(app.find('StyletronProvider').props().styletron,
    'Non-null styletron instantiation is passed as prop to the provider');
  t.equal(app.find('Router').length, 1, 'react-router instance is initialized');

  t.end();
});
