const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Connect to database
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  useUTC: false,
  timezone: '+02:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
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
    await sequelize.sync({ alter: true });
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
