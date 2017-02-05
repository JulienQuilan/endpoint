import sinon from 'sinon';
import test from 'tape';

import add from '../../../../src/server/api/endpoint/add';

test('Duplicate endpoint name', (t) => {
  const mockCtx = {
    db: {
      endpoint: {
        insert(doc, cb) {
          return cb({errorType: 'uniqueViolated'});
        }
      }
    }
  };
  const mockReq = {
    json: {}
  };
  const mockRes = {
    error: sinon.spy()
  };

  add.handler(mockCtx, mockReq, mockRes);

  t.ok(mockRes.error.calledWith(409, 'An endpoint with that name already exists.'),
    'HTTP 409 if a document with the specified name already exists');

  t.end();
});

test('Undefined database lookup error', (t) => {
  const mockCtx = {
    db: {
      endpoint: {
        insert(doc, cb) {
          return cb('error');
        }
      }
    }
  };
  const mockReq = {
    json: {}
  };
  const mockRes = {
    error: sinon.spy()
  };

  add.handler(mockCtx, mockReq, mockRes);

  t.ok(mockRes.error.calledWith(500, 'Undefined database error.'),
    'HTTP 500 on undefined database lookup errors');

  t.end();
});

test('Undefined database lookup error', (t) => {
  const mockCtx = {
    db: {
      endpoint: {
        insert(doc, cb) {
          t.deepEqual(doc, {doc: true}, 'JSON data inserted into database is correct');

          return cb();
        }
      }
    }
  };
  const mockReq = {
    json: {doc: true}
  };
  const mockRes = {
    error: sinon.spy(),
    success: sinon.spy()
  };

  add.handler(mockCtx, mockReq, mockRes);

  t.notOk(mockRes.error.called, 'Request does not error');
  t.ok(mockRes.success.calledWith({doc: true}), 'Input JSON is sent back to the user');

  t.end();
});
