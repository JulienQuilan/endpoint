import test from 'tape';

import {spacing, marginStyle} from '../../../src/client/styles/margin';

test('Expected spacing definitions', (t) => {
  t.ok(spacing.default, 'Default size is present');
  t.ok(spacing.tiny, 'Tiny size is present');
  t.ok(spacing.small, 'Small size is present');
  t.ok(spacing.large, 'Large size is present');
  t.ok(spacing.huge, 'Huge size is present');
  t.ok(spacing.enormous, 'Enormous size is present');

  t.end();
});

test('Margin style factory function', (t) => {
  t.deepEqual(marginStyle('default', 'top'), {
    margin: `${spacing.default} 0 0 0`
  }, 'Margin style object is correct for a single dimension');
  t.deepEqual(marginStyle('default', ['top', 'left']), {
    margin: `${spacing.default} 0 0 ${spacing.default}`
  }, 'Margin style object is correct for multiple dimensions');

  t.end();
});
