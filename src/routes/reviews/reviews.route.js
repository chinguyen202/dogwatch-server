const express = require('express');
const {
  getMyReviews,
  createReview,
  editReview,
} = require('./reviews.controller');
const { verifyToken } = require('../auth/auth.middleware');

const reviewRouter = express.Router();

reviewRouter.get('/api/v1/reviews/', verifyToken, getMyReviews);
reviewRouter.post('/api/v1/reviews/:bookingId', verifyToken, createReview);
reviewRouter.put('/api/v1/reviews/:reviewId', verifyToken, editReview);

module.exports = reviewRouter;
