import isPlainObject from 'is-plain-object';
import OPERATORS from './operators';


/**
 * Applies mongo standard query to knex query builder
 * @param  {Object} query : a query based on mongo standard query
 * @param  {Object} knex  : knex query builder
 */
function applyMongoToKnex (query, knex, parentKey) {
  Object.keys(query).forEach((key) => {
    const value = query[key];

    if (isPlainObject(value)) { return applyMongoToKnex(value, knex, key); }

    const column = parentKey || key;
    const operator = OPERATORS[key] || '=';

    return knex.where(column, operator, value);
  });
}


export default applyMongoToKnex;