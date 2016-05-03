import { expect } from 'chai';
import mongoToKnex from '../src';

describe('mongo-to-knex', function () {
  beforeEach(function () {
    const knex = require('knex')({ dialect: 'sqlite3' });
    this.knexQuery = knex('table');
  });

  it('should apply a query with no operator (equal)', function () {
    mongoToKnex({ age: 10 }, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where "age" = 10');
  });

  it('should apply a query with "$ne" operator', function () {
    mongoToKnex({ age: { $ne: 10 } }, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where "age" <> 10');
  });

  it('should apply a query with "$lt" operator', function () {
    mongoToKnex({ age: { $lt: 10 }}, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where "age" < 10');
  });

  it('should apply a query with "$lte" operator', function () {
    mongoToKnex({ age: { $lte: 10 }}, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where "age" <= 10');
  });

  it('should apply a query with "$gt" operator', function () {
    mongoToKnex({ age: { $gt: 10 }}, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where "age" > 10');
  });

  it('should apply a query with "$gte" operator', function () {
    mongoToKnex({ age: { $gte: 10 }}, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where "age" >= 10');
  });

  it('should apply a query with "$and" operator', function () {
    mongoToKnex({ $and: [ { quantity: { $lt: 20 } }, { price: 10 } ] }, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where ("quantity" < 20 and "price" = 10)');
  });

  it('should apply a query with "$or" operator', function () {
    mongoToKnex({ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }, this.knexQuery);
    expect(this.knexQuery.toString()).to.eql('select * from "table" where ("quantity" < 20 or "price" = 10)');
  });
});
