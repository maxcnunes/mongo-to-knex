import isPlainObject from 'is-plain-object';


const OPERATORS = {
  $ne: '<>',
  $lt: '<',
  $lte: '<=',
  $gt: '>',
  $gte: '>='
};


const OPERATORS_KNEX_METHOD = {
  $and: 'where',
  $or: 'orWhere'
};


/**
 * Applies mongo standard query to knex query builder
 * @param  {Object} query : a query based on mongo standard query
 * @param  {Object} knex  : knex query builder
 */
export default function applyMongoToKnex (query, knex, parentKey, parentKnexMethodName) {
  Object.keys(query).forEach((key) => {
    const value = query[key];

    if (isPlainObject(value)) { return applyMongoToKnex(value, knex, key); }

    const knexMethodName = OPERATORS_KNEX_METHOD[key];
    if (knexMethodName) { return queryByMethod(knex, key, value, knexMethodName); }

    const column = parentKey || key;
    const operator = OPERATORS[key] || '=';

    const methodName = parentKnexMethodName || 'where';
    return knex[methodName](column, operator, value);
  });
}


function queryByMethod (knex, key, value, knexMethodName) {
  if (!Array.isArray(value)) {
    throw new Error(`${key} expect an array value`);
  }

  knex.where(function () {
    value.forEach(item => applyMongoToKnex(item, this, null, knexMethodName));
  });
}
