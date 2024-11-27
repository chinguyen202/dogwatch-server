const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define(
  'services',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A service with this name is already exist',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Service name can not be empty',
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Service;
