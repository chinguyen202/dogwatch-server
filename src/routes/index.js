const userRouter = require('./users/users.route');
const authRouter = require('./auth/auth.route');
const serviceRouter = require('./services/services.route');
const bookingRouter = require('./bookings/bookings.route');
const reviewRouter = require('./reviews/reviews.route');
const messageRouter = require('./messages/messages.route');

module.exports = {
  userRouter,
  authRouter,
  serviceRouter,
  bookingRouter,
  reviewRouter,
  messageRouter,
};
