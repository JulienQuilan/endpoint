import fs from 'fs';
import test from 'tape';

test('Index template references JS files', (t) => {
  const template = fs.readFileSync('src/client/templates/index.pug', 'utf8');

  t.ok(template.indexOf('/static/img/favicon.ico') !== -1, 'Template references favicon');
  t.ok(template.indexOf('#app') !== -1, 'Main client SPA div is present');
  t.ok(template.indexOf('include ../static/dist/bundle.js') !== -1, 'Client bundle is included');

  t.end();
});
