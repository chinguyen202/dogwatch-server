const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define(
  'reviews',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Rating must be a number between 1 to 5',
        },
        max: {
          args: 5,
          msg: 'Rating must be a number between 1 to 5',
        },
        isInt: {
          args: true,
          msg: 'Rating must be a number between 1 to 5',
        },
        notEmpty: {
          args: true,
          msg: 'A rating must be given',
        },
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A comment must be given',
        },
        len: {
          args: [4, 300],
          msg: 'A review must contains at least 4 to 300 characters.',
        },
      },
    },
    bookingId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Missing value for booking id',
        },
      },
    },
    reviewerId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Missing value for reviewer id',
        },
      },
    },
    revieweeId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Missing value for reviewee id',
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Review;
