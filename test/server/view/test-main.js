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
    render: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);

  const template = mockRes.render.getCalls()[0].args[0];
  t.ok(template.endsWith('templates/index'), 'Regular template is rendered');

  t.end();
});
