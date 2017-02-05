/* global setTimeout */

import extend from 'deep-extend';

/**
 * Handler for serving the JSON data associated with an endpoint name.
 *
 * @param {Object} ctx Server-side application context
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function handler(ctx, req, res) {
  ctx.db.endpoint.findOne({name: req.params.endpoint}, (err, doc) => {
    if (err) {
      return res.error(500, 'Undefined database error.');
    }

    if (!doc) {
      return res.error(404, 'An endpoint with the specified name does not exist.');
    }

    const data = extend({
      statusCode: 200,
      data: {},
      delay: 0
    }, doc);

    return setTimeout(() => {
      res.status(data.statusCode);
      return res.send(data.data);
    }, data.delay);
  });
}

export default handler;
