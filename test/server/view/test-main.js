import sinon from 'sinon';
import test from 'tape';

import handler from '../../../src/server/view/main';

test('Handler serves client template', (t) => {
  const mockCtx = {};
  const mockReq = {
    headers: {
      'x-forwarded-for': '127.0.0.1'
    }
  };
  const mockRes = {
    setHeader: sinon.spy(),
    send: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);

  const html = mockRes.send.getCalls()[0].args[0].toString();

  t.ok(mockRes.setHeader.calledWith('content-type', 'text/html'),
    'Content-Type on response is set to HTML');
  t.ok(html.startsWith('<!DOCTYPE html>'), 'HTML file contents are sent in response');

  t.end();
});
