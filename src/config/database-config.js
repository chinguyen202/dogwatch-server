module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    server: process.env.DB_HOST,
    domain: process.env.DOMAIN,
    dialect: 'mssql',
  },
  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
