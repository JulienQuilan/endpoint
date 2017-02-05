import React from 'react';
import test from 'tape';

import Container from '../../../../src/client/app/components/container';
import mountWithStyletron from '../../util/mount-with-styletron';

test('Container is rendered, for three different width stages', (t) => {
  [
    300,
    500,
    700
  ].forEach((width) => {
    const container = mountWithStyletron(
      <Container win={{width}} />
    );

    t.equal(container.find('Header').length, 1, 'Container has Header component');
    t.equal(container.find('Footer').length, 1, 'Container has Footer component');
  });

  t.end();
});
