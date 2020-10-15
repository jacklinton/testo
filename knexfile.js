// Update with your config settings.

module.exports = {
  local: {
    client: 'pg',
    connection: {
      host: 'testodb',
      database: 'testo',
      user: 'dbuser',
      password: 'dbpassword',
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
  },

  development: {
    client: 'pg',
    connection: {
      host: 'testodb',
      database: 'testo',
      user: 'dbuser',
      password: 'dbpassword',
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'testodb',
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${__dirname}/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/knex/seeds`,
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: 'testodb',
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${__dirname}/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/knex/seeds`,
    },
  },
}
