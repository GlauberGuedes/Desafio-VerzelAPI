const knex = require('knex')({
  client: 'pg',
  connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'verzel_bd'
  }
});

module.exports = knex;