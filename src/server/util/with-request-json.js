import util from '../util';

/**
 * Higher-order function wrapper around Express endpoint handler callbacks that validates the input
 * JSON (if any) against the corresponding endpoint's request JSON schema. A standardized HTTP 400
 * is returned to the client on schema validation errors, whereas logic is passed to the original
 * handler if the schema is successfully validated. The request object is augmented with a `json`
 * property for reading by the handler, which is guaranteed to be a valid (according to the
 * endpoint's schema) JSON object.
 *
 * @param {Object} ctx Server-side request context.
 * @param {Function} endpoint Original endpoint handler function.
 * @returns {Function} Higher-order handler function taking (req, res) as input.
 */
function withRequestJSON(ctx, endpoint) {
  return (req, res) => {
    util.validateSchema(endpoint.schema, req.body, (validationErr, data) => {
      if (validationErr) {
        return res.error(400, validationErr);
      }

      req.json = data;
      return endpoint.handler(ctx, req, res);
    });
  };
}

export default withRequestJSON;
