import Datastore from 'nedb';
import path from 'path';

/**
 * Initialize the server-side application context, where each property is an object with functions
 * allowing for modification of some component of universal server-side state.
 *
 * @returns {Object} Object of context properties.
 * @constructor
 */
function Context() {
  this.db = this.initDB();
}

/**
 * Initialize the server-side, on-disk datastore.
 *
 * @returns {Object} Object whose properties are datastores.
 */
Context.prototype.initDB = function initDB() {
  const endpoint = new Datastore({
    filename: path.resolve(__dirname, '../../db/endpoint'),
    autoload: true
  });
  endpoint.ensureIndex({fieldName: 'name', unique: true});

  return {endpoint};
};

export default Context;
