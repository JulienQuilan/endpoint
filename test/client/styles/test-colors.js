import React from 'react';
import {mount} from 'enzyme';
import test from 'tape';

import {colors, BackgroundColor, Color} from '../../../src/client/styles/colors';

test('Expected color definitions', (t) => {
  t.equal(Object.keys(colors).length, 39, 'Number of colors is correct');
  t.ok(colors.primary, 'A primary color is defined');
  t.ok(colors.primaryLight, 'A primary light color is defined');
  t.ok(colors.primaryDark, 'A primary dark color is defined');

  t.end();
});

test('BackgroundColor and Color wrapper components', (t) => {
  const color = mount(
    <Color />
  );
  t.equal(color.find('div').length, 1, 'Color wraps div tag');

  const backgroundColor = mount(
    <BackgroundColor />
  );
  t.equal(backgroundColor.find('div').length, 1, 'BackgroundColor wraps div tag');

  t.end();
});
