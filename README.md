# mongo to knex

Applies mongo standard query to knex query builder.

## Available operators

Checkout the available operators in the [tests](https://github.com/maxcnunes/mongo-to-knex/blob/master/spec/mongo-to-knex.spec.js).

## Installation

Install via npm:

```bash
$ npm install mongo-to-knex
```

## Usage

```js
var mongoToKnex = require('mongo-to-knex');

// knex main object
var knex = require('knex')({ /* knex config */ });

// knex query builder object
var knexQuery = knex('your-table-name');

// your query on mongo standard
var mongoQuery = { age: { $lt: 10 } };

// applies mongo query to knex builder
mongoToKnex(mongoQuery, knexQuery);

// continue using the knex query normally
return knexQuery.
  .limit(100)
  .orderBy('name', 'desc');
```

## Contributing

It is required to use [editorconfig](http://editorconfig.org/) and please write and run specs before pushing any changes:

```js
npm test
```

## License

Copyright (c) 2015 Max Claus Nunes. This software is licensed under the [MIT License](http://raw.github.com/maxcnunes/mongo-to-knex/master/LICENSE).