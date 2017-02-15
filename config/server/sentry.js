/* global process */
/* eslint-disable no-process-env */

export default {
  // Server-side Sentry client key.
  // This field is optional; if Sentry is not part of your infrastructure or you do not care about
  // error reporting, this field will be ignored.
  dsn: process.env.SERVER_SENTRY_DSN || ''
};
