import fs from 'fs';
import test from 'tape';

test('Index template references CSS and JS files', (t) => {
  const template = fs.readFileSync('src/client/templates/index.pug', 'utf8');

  t.ok(template.indexOf('/static/dist/stylesheet.css') !== -1,
    'Template references /static/dist/stylesheet.css');
  t.ok(template.indexOf('/static/dist/bundle.js') !== -1,
    'Template references /static/dist/bundle.js');

  t.end();
});
