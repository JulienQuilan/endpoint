import test from 'tape';

import fonts from '../../../../src/client/resources/blobs/fonts';

test('Regular font is base64-encoded', (t) => {
  t.ok(fonts.dejavuSansMonoRegular, 'Dejavu Sans Mono Regular');

  t.end();
});

test('Bold font is base64-encoded', (t) => {
  t.ok(fonts.dejavuSansMonoBold, 'Dejavu Sans Mono Bold');

  t.end();
});
