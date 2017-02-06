import test from 'tape';

import {transition} from '../../../src/client/styles/general';

test('General styles', (t) => {
  t.deepEqual(transition(), {transition: '0.15s all ease'}, 'Default transition style is correct');

  t.end();
});
