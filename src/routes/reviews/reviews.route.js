const express = require('express');
const { getMyReviews, createReview } = require('./reviews.controller');
const { verifyToken } = require('../auth/auth.middleware');

const reviewRouter = express.Router();

reviewRouter.get('/api/v1/reviews/', verifyToken, getMyReviews);
reviewRouter.post('/api/v1/reviews/:bookingId', verifyToken, createReview);

module.exports = reviewRouter;
