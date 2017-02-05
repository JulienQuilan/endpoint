import test from 'tape';

import {sizes, primaryFontStyle} from '../../../src/client/styles/fonts';

test('Expected size definitions', (t) => {
  t.ok(sizes.alpha, 'Alpha size is present');
  t.ok(sizes.beta, 'Beta size is present');
  t.ok(sizes.delta, 'Delta size is present');
  t.ok(sizes.epsilon, 'Epsilon size is present');
  t.ok(sizes.gamma, 'Gamma size is present');
  t.ok(sizes.iota, 'Iota size is present');
  t.ok(sizes.kilo, 'Kilo size is present');
  t.ok(sizes.lambda, 'Lambda size is present');

  t.end();
});

test('Font style factory function', (t) => {
  t.deepEqual(primaryFontStyle('beta', '#ccc', 'bold'), {
    fontFamily: 'dejavu-sans-mono--bold',
    fontSize: sizes.beta,
    color: '#ccc'
  }, 'Font style object is correct');

  t.end();
});
