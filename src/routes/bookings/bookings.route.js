const express = require('express');
const {
  getMyBookings,
  createBooking,
  updateBookingStatus,
} = require('./bookings.controller');
const {
  ownerOnly,
  sitterOnly,
  verifyToken,
} = require('../auth/auth.middleware');

const bookingRouter = express.Router();

bookingRouter.get('/api/v1/bookings', verifyToken, getMyBookings);
bookingRouter.post('/api/v1/bookings', verifyToken, ownerOnly, createBooking);
bookingRouter.put(
  '/api/v1/bookings/:bookingId',
  verifyToken,
  sitterOnly,
  updateBookingStatus
);

module.exports = bookingRouter;
