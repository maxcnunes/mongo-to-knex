import isPlainObject from 'is-plain-object';
import OPERATORS from './operators';


/**
 * Applies mongo standard query to knex query builder
 * @param  {Object} query : a query based on mongo standard query
 * @param  {Object} knex  : knex query builder
 */
function applyMongoToKnex (query, knex) {
  Object.keys(query).forEach((key) => {
    const value = query[key];

    if (isPlainObject(value)) { return applyMongoToKnex(value, knex); }
    if (!OPERATORS[key]) { return null; }

    knex.where(key, OPERATORS[key], value);
  });
}


export default applyMongoToKnex;