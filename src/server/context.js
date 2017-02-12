import Datastore from 'nedb';
import LRU from 'lru-cache';
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
  this.cache = this.initCache();
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

/**
 * Initialize the endpoint data cache layer. This function will also warm the cache with all
 * endpoints currently in the datastore.
 *
 * @returns {Object} Instance of LRU with database-stored endpoints already in the cache.
 */
Context.prototype.initCache = function initCache() {
  const cache = new LRU({max: 1000});

  // Cache warming with endpoints already in the datastore
  this.db.endpoint.find({}, (_, docs = []) => docs.forEach((doc) => cache.set(doc.name, doc)));

  return cache;
};

export default Context;
