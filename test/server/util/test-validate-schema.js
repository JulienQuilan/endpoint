import test from 'tape';

import validateSchema from '../../../src/server/util/validate-schema';

test('Schema validation error', (t) => {
  const schema = {
    properties: {
      name: {
        type: 'string'
      }
    }
  };

  validateSchema(schema, {name: 1}, (err) => {
    t.equal(err, 'data.name should be string', 'Error message is produced');

    t.end();
  });
});

test('Input sanitization with default value', (t) => {
  const schema = {
    properties: {
      name: {
        type: 'string',
        default: 'default'
      }
    }
  };

  validateSchema(schema, {}, (err, sanitized) => {
    t.notOk(err, 'No error is produced');
    t.deepEqual(sanitized, {name: 'default'}, 'Default entries are filled according to schema');

    t.end();
  });
});
