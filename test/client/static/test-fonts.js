import fs from 'fs';
import test from 'tape';

test('Static directory contains primary fonts', (t) => {
  fs.accessSync('src/client/static/fonts/deja-vu-sans-mono--regular.ttf', fs.constants.F_OK);
  t.pass('Regular primary font exists');

  fs.accessSync('src/client/static/fonts/deja-vu-sans-mono--bold.ttf', fs.constants.F_OK);
  t.pass('Bold primary font exists');

  t.end();
});
