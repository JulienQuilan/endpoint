/* global setTimeout */

import extend from 'deep-extend';

/**
 * Set some reasonable defaults on the document (useful in the event of schema upgrades) and perform
 * all server-side processing before sending the endpoint's data to the client.
 *
 * @param {Object} res Express response object.
 * @param {Object} doc Document describing the endpoint.
 */
function sendEndpoint(res, doc) {
  const data = extend({
    statusCode: 200,
    data: {},
    delay: 0
  }, doc);

  return setTimeout(() => {
    res.status(data.statusCode);
    return res.send(data.data);
  }, data.delay);
}

/**
 * Handler for serving the JSON data associated with an endpoint name.
 *
 * @param {Object} ctx Server-side application context
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function handler(ctx, req, res) {
  // Bypass the database if the document is cached in-memory
  const cachedDoc = ctx.cache.get(req.params.endpoint);
  if (cachedDoc) {
    return sendEndpoint(res, cachedDoc);
  }

  return ctx.db.endpoint.findOne({name: req.params.endpoint}, (err, doc) => {
    if (err) {
      return res.error(500, 'Undefined database error.');
    }

    if (!doc) {
      return res.error(404, 'An endpoint with the specified name does not exist.');
    }

    return sendEndpoint(res, doc);
  });
}

export default handler;
