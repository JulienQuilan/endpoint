import React from 'react';
import sinon from 'sinon';
import test from 'tape';

import browser from '../../../../src/client/app/util/browser';
import Header from '../../../../src/client/app/components/header';
import mountWithStyletron from '../../util/mount-with-styletron';

test('Header is rendered', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const footer = mountWithStyletron(
    <Header win={{width: 1, height: 1}} />
  );

  t.equal(footer.find('.title').length, 1, 'Title is present');
  t.equal(footer.find('.subtitle').length, 1, 'Subtitle is present');

  footer.find('.title').simulate('click');
  t.ok(pushStub.calledWith('/'), 'Clicking on title redirects to home');

  browser.push.restore();
  t.end();
});
