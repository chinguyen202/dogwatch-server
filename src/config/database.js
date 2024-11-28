const { Sequelize } = require('sequelize');
const { MsSqlDialect } = require('@sequelize/mssql');

const dotenv = require('dotenv');
dotenv.config();

// Connect to database
const { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT, DOMAIN } =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mssql',
  host: DB_HOST,
  port: DB_PORT,
  useUTC: false,
  database: DB_NAME,
  authentication: {
    type: 'default',
    options: {
      userName: DB_USER,
      password: DB_PASSWORD,
    },
  },
  timezone: '+02:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

// Execute the connection and sync sequence
(async () => {
  await connection(); // First check if the connection is successful
  await syncDatabase(); // Sync the database models
})();

module.exports = sequelize;
