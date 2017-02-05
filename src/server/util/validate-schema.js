import Ajv from 'ajv';
import extend from 'deep-extend';

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true
});

/**
 * Wrapper around AJV's JSON schema validation logic to use an asynchronous, callback-based API.
 * The callback function is called with a string representing an English-language description of
 * schema validation errors, if any, and a sanitized/corrected version of the input based on the
 * specified schema.
 *
 * @param {Object} schema A valid AJV schema description object.
 * @param {Object} data The actual input data.
 * @param {Function} cb Callback function called with (schemaErr, sanitizedInput), if applicable.
 * @returns {*} Return value is unused.
 */
function validateSchema(schema, data, cb) {
  const validate = ajv.compile(schema);
  const sanitized = extend({}, data);
  const isValid = validate(sanitized);

  if (isValid) {
    return cb(null, sanitized);
  }
  return cb(ajv.errorsText(validate.errors));
}

export default validateSchema;
