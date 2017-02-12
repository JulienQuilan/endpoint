import fs from 'fs';

const index = fs.readFileSync('src/client/static/dist/index.html');

/**
 * Main handler for serving client views.
 *
 * @param {Object} ctx Server-side application context
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function handler(ctx, req, res) {
  res.setHeader('content-type', 'text/html');
  return res.send(index);
}

export default handler;
