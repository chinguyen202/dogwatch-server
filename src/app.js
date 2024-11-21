const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const {
  userRouter,
  authRouter,
  serviceRouter,
  bookingRouter,
  reviewRouter,
  messageRouter,
} = require('./routes/index');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // parse json
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors()); // TODO: enable CORS = This is CORS-enabled for all origins! Need to change later

// Routes
app.use(authRouter);
app.use(userRouter);
app.use(serviceRouter);
app.use(bookingRouter);
app.use(reviewRouter);
app.use(messageRouter);

module.exports = app;
