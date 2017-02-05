import test from 'tape';

import {transition} from '../../../src/client/styles/general';

test('General styles', (t) => {
  t.equal(transition, '0.15s all ease', 'Transition style is correct');

  t.end();
});
