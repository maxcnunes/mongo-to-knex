/**
 * maps mongo query operators to sql operators
 *
 * query with no operator is mapped to equal operator (e.g. "{ name: 'jack'}" => "name = 'jack'")
 */
export default {
  $lt: '<',
  $lte: '<=',
  $gt: '>',
  $gte: '>='
};