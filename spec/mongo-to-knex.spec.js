import { expect } from 'chai';
import sinon from 'sinon';
import mongoToKnex from '../src';

describe('mongo-to-knex', function () {
  beforeEach(function () {
    const knex = require('knex')({});
    this.knexQuery = knex('table');
    sinon.stub(this.knexQuery, 'where').returns(this.knexQuery);
  });

  it('should apply a query with "$lt" operator', function () {
    mongoToKnex({ age: { $lt: 10 }}, this.knexQuery);
    expect(this.knexQuery.where.args[0]).to.eql([ '$lt', '<', 10 ]);
  });

  it('should apply a query with "$lte" operator', function () {
    mongoToKnex({ age: { $lte: 10 }}, this.knexQuery);
    expect(this.knexQuery.where.args[0]).to.eql([ '$lte', '<=', 10 ]);
  });

  it('should apply a query with "$gt" operator', function () {
    mongoToKnex({ age: { $gt: 10 }}, this.knexQuery);
    expect(this.knexQuery.where.args[0]).to.eql([ '$gt', '>', 10 ]);
  });

  it('should apply a query with "$gte" operator', function () {
    mongoToKnex({ age: { $gte: 10 }}, this.knexQuery);
    expect(this.knexQuery.where.args[0]).to.eql([ '$gte', '>=', 10 ]);
  });
});
