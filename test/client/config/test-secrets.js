import test from 'tape';

import secrets from '../../../src/client/config/secrets';

test('Secrets contain expected keys', (t) => {
  t.ok(secrets.sentryDSN !== undefined, 'Client-side sentry DSN is defined');

  t.end();
});
