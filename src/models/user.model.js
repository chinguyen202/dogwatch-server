const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'users',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name can not be empty',
        },
        len: {
          args: [3, 100],
          msg: 'Must be between 3 and 100 characters',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last name can not be empty',
        },
        len: {
          args: [3, 100],
          msg: 'Must be between 3 and 100 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'The email have been used to register',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email can not be empty',
        },
        isEmail: {
          args: true,
          msg: 'Email must have email format',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password can not be empty',
        },
        len: {
          args: [4, 100],
          msg: 'Must be between 4 and 100 characters',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('sitter', 'owner', 'admin'),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You must choose a role',
        },
        isIn: {
          args: [['sitter', 'owner', 'admin']],
          msg: 'Role must be one of the following: sitter, owner',
        },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location can not be empty',
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    headline: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [4, 150],
          msg: 'Must be between 4 and 150 characters',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [4, 1000],
          msg: 'Must be between 4 and 1000 characters',
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate() {},
      beforeBulkCreate() {},
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
