const knex = require('knex')({
  client: 'pg',
  connection: {
      host: 'ec2-52-6-77-239.compute-1.amazonaws.com',
      user: 'hnuopsugrjelul',
      password: 'f32538acd45607722c141ab88f411bd8aeb2f00f52ab439b0055b22432fd27f4',
      database: 'd28m5m94uscb00',
      port: 5432,
      ssl: {
        rejectUnauthorized: false
      }
  }
});

module.exports = knex;