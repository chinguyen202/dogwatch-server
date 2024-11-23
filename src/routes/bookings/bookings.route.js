const express = require('express');
const {
  getMyBookings,
  createBooking,
  updateBookingStatus,
  setBookingsToCompleted,
  getCompletedBookings,
  getPendingBookings,
  getConfirmedBookings,
} = require('./bookings.controller');
const { verifyToken } = require('../auth/auth.middleware');

const bookingRouter = express.Router();

/** Routes related to booking */
// Get all of log in user's bookings
bookingRouter.get(
  '/api/v1/bookings',
  verifyToken,
  setBookingsToCompleted,
  getMyBookings
);
// Get confirmed bookings of log in users
bookingRouter.get(
  '/api/v1/bookings/confirmed',
  verifyToken,
  getConfirmedBookings
);

// Get pending booking of log in users
bookingRouter.get('/api/v1/bookings/pending', verifyToken, getPendingBookings);

// Get completed bookings of log in users
bookingRouter.get(
  '/api/v1/bookings/completed',
  verifyToken,
  getCompletedBookings
);

// Create a booking request, allowed to perform by dog owner only
bookingRouter.post('/api/v1/bookings', verifyToken, createBooking);
// Update booking status
bookingRouter.patch(
  '/api/v1/bookings/:bookingId',
  verifyToken,
  updateBookingStatus
);

module.exports = bookingRouter;
