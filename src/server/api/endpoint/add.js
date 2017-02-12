const schema = {
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 30,
      pattern: '^[a-zA-Z0-9-_]+$'
    },
    data: {
      type: 'object'
    },
    statusCode: {
      type: 'number',
      minimum: 100,
      maximum: 600,
      default: 200
    },
    delay: {
      type: 'number',
      minimum: 0,
      maximum: 60 * 1000,
      default: 0
    }
  },
  required: ['name', 'data']
};

/**
 * Create a new endpoint and save it to the server-side datastore.
 *
 * @param {Object} ctx Server-side application context
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
function handler(ctx, req, res) {
  ctx.db.endpoint.insert(req.json, (err) => {
    if (err) {
      switch (err.errorType) {
        case 'uniqueViolated':
          return res.error(409, 'An endpoint with that name already exists.');
        default:
          return res.error(500, 'Undefined database error.');
      }
    }

    ctx.cache.set(req.json.name, req.json);

    return res.success(req.json, 201);
  });
}

export default {handler, schema};
