import path from 'path';

/**
 * Main handler for serving client views.
 *
 * @param {Object} ctx Server-side application context
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function handler(ctx, req, res) {
  return res.render(path.resolve(__dirname, '../../client/templates/index'));
}

export default handler;
