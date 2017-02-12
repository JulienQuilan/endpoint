import sinon from 'sinon';
import test from 'tape';

import handler from '../../../src/server/view/endpoint';

test('Endpoint CORS headers allow any origin', (t) => {
  const mockCtx = {
    db: {
      endpoint: {
        findOne(opts, cb) {}
      }
    },
    cache: {
      get: sinon.spy()
    }
  };
  const mockReq = {
    params: {
      endpoint: 'endpoint'
    }
  };
  const mockRes = {
    header: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);

  t.ok(mockCtx.cache.get.calledWith('endpoint'), 'Attempt to look up endpoint in cache');
  t.ok(mockRes.header.calledWith('Access-Control-Allow-Origin', '*'),
    'CORS Access-Control-Allow-Origin header is set');
  t.ok(mockRes.header.calledWith('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),  // eslint-disable-line max-len
    'Access-Control-Allow-Headers CORS header is set');

  t.end();
});

test('Database error returns HTTP 500', (t) => {
  const mockCtx = {
    db: {
      endpoint: {
        findOne(opts, cb) {
          t.equal(opts.name, 'endpoint', 'Endpoint name is passed from URL');

          return cb('error');
        }
      }
    },
    cache: {
      get: sinon.spy()
    }
  };
  const mockReq = {
    params: {
      endpoint: 'endpoint'
    }
  };
  const mockRes = {
    header: sinon.spy(),
    error: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);

  t.ok(mockCtx.cache.get.calledWith('endpoint'), 'Attempt to look up endpoint in cache');
  t.ok(mockRes.error.calledWith(500, 'Undefined database error.'), 'DB error causes HTTP 500');

  t.end();
});

test('Nonexistent endpoint returns HTTP 404', (t) => {
  const mockCtx = {
    db: {
      endpoint: {
        findOne(opts, cb) {
          t.equal(opts.name, 'endpoint', 'Endpoint name is passed from URL');

          return cb();
        }
      }
    },
    cache: {
      get: sinon.spy()
    }
  };
  const mockReq = {
    params: {
      endpoint: 'endpoint'
    }
  };
  const mockRes = {
    header: sinon.spy(),
    error: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);

  t.ok(mockCtx.cache.get.calledWith('endpoint'), 'Attempt to look up endpoint in cache');
  t.ok(mockRes.error.calledWith(404, 'An endpoint with the specified name does not exist.'),
    'Null database document returns HTTP 404');

  t.end();
});

test('Malformed document has default properties', (t) => {
  const clock = sinon.useFakeTimers();
  const mockCtx = {
    db: {
      endpoint: {
        findOne(opts, cb) {
          t.equal(opts.name, 'endpoint', 'Endpoint name is passed from URL');

          return cb(null, {});
        }
      }
    },
    cache: {
      get: sinon.spy()
    }
  };
  const mockReq = {
    params: {
      endpoint: 'endpoint'
    }
  };
  const mockRes = {
    header: sinon.spy(),
    error: sinon.spy(),
    status: sinon.spy(),
    send: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);
  clock.tick(100);

  t.ok(mockCtx.cache.get.calledWith('endpoint'), 'Attempt to look up endpoint in cache');
  t.notOk(mockRes.called, 'No error in response');
  t.ok(mockRes.status.calledWith(200), 'Default HTTP status code is 200');
  t.ok(mockRes.send.calledWith({}), 'Default returned data is an empty object');

  clock.restore();
  t.end();
});

test('Endpoint JSON is returned via the database', (t) => {
  const clock = sinon.useFakeTimers();
  const mockCtx = {
    db: {
      endpoint: {
        findOne(opts, cb) {
          t.equal(opts.name, 'endpoint', 'Endpoint name is passed from URL');

          return cb(null, {
            statusCode: 403,
            data: {data: true},
            delay: 100
          });
        }
      }
    },
    cache: {
      get: sinon.spy()
    }
  };
  const mockReq = {
    params: {
      endpoint: 'endpoint'
    }
  };
  const mockRes = {
    header: sinon.spy(),
    error: sinon.spy(),
    status: sinon.spy(),
    send: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);

  clock.tick(10);

  t.notOk(mockRes.send.called, 'Response is not ended until the delay expires');

  clock.tick(90);

  t.notOk(mockRes.called, 'No error in response');
  t.ok(mockRes.status.calledWith(403), 'HTTP status code is correct');
  t.ok(mockRes.send.calledWith({data: true}), 'JSON response is correct');

  clock.restore();
  t.end();
});

test('Endpoint JSON is retrieved from cache', (t) => {
  const clock = sinon.useFakeTimers();
  const mockCtx = {
    db: {
      endpoint: {
        findOne: sinon.spy()
      }
    },
    cache: {
      get(endpoint) {
        t.equal(endpoint, 'endpoint', 'Endpoint name is passed to cache lookup');

        return {data: {1: 2}};
      }
    }
  };
  const mockReq = {
    params: {
      endpoint: 'endpoint'
    }
  };
  const mockRes = {
    header: sinon.spy(),
    error: sinon.spy(),
    status: sinon.spy(),
    send: sinon.spy()
  };

  handler(mockCtx, mockReq, mockRes);

  clock.tick(10);

  t.notOk(mockCtx.db.endpoint.findOne.called, 'No attempt to fetch document from database');
  t.ok(mockRes.send.calledWith({1: 2}), 'JSON response is correct');

  clock.restore();
  t.end();
});
