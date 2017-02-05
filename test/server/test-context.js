import Datastore from 'nedb';
import sinon from 'sinon';
import test from 'tape';

import Context from '../../src/server/context';

test('Database is initialized', (t) => {
  // nedb by default will attempt to create the database file if it doesn't already exist.
  // This can be an issue on some CI systems that put the job in a read-only environment, which
  // would cause this to error appropriately. To work around this, this test will play through all
  // the expected database initialization procedures but skip only the part where the file is
  // actually loaded.
  const loadStub = sinon.stub(Datastore.prototype, 'loadDatabase');

  new Context();  // eslint-disable-line no-new

  t.pass('Database can be initialized successfully');
  t.ok(loadStub.called, 'Attempt to load the database');

  Datastore.prototype.loadDatabase.restore();
  t.end();
});
