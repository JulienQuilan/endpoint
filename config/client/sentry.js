/* global process */
/* eslint-disable no-process-env */

export default {
  // Client-side Sentry client key.
  // This field is optional; if Sentry is not part of your infrastructure or you do not care about
  // error reporting, this field will be ignored.
  dsn: process.env.CLIENT_SENTRY_DSN || ''
};
