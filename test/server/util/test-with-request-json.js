import sinon from 'sinon';
import test from 'tape';

import withRequestJSON from '../../../src/server/util/with-request-json';

test('Schema validation error returns generic response', (t) => {
  const mockHandler = sinon.spy();
  const mockReq = {
    body: {
      name: 1
    }
  };
  const mockRes = {
    error: sinon.spy()
  };

  const wrapped = withRequestJSON({}, {
    handler: mockHandler,
    schema: {
      properties: {
        name: {
          type: 'string'
        }
      }
    }
  });

  wrapped(mockReq, mockRes);

  t.ok(mockRes.error.calledWith(400, 'data.name should be string'), 'Response errors with 400');
  t.notOk(mockReq.json, 'No JSON is set on the request object');
  t.notOk(mockHandler.called, 'Original handler is not invoked');

  t.end();
});

test('Successful schema validation returns logic to handler with JSON', (t) => {
  const mockHandler = sinon.spy();
  const mockReq = {
    body: {}
  };
  const mockRes = {
    error: sinon.spy()
  };

  const wrapped = withRequestJSON({}, {
    handler: mockHandler,
    schema: {
      properties: {
        name: {
          type: 'string',
          default: 'name'
        }
      }
    }
  });

  wrapped(mockReq, mockRes);

  t.notOk(mockRes.error.called, 'Response does not error');
  t.deepEqual(mockReq.json, {name: 'name'}, 'Sanitized JSON is set on request object');
  t.ok(mockHandler.called, 'Original handler is invoked');

  t.end();
});
