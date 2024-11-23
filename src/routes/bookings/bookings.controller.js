const { where, Op } = require('sequelize');
const { Booking, User, Service, Review } = require('../../models/index');

/** Create a booking ( done by log in user who is dog owner) */
const createBooking = async (req, res) => {
  const { startDate, endDate, location, serviceId, sitterId } = req.body;
  const logInUserId = req.user.userId;

  try {
    // Find the sitter
    const sitter = await User.findOne({
      where: {
        uuid: sitterId,
      },
      include: {
        model: Service,
        through: { attributes: [] },
      },
    });
    if (!sitter)
      return res.status(404).json({ message: 'Sitter is not found' });

    // Extract the names of the services the sitter offers
    const offeredServiceIds = sitter.services.map((service) => service.uuid);

    // If the service is offer by the sitter
    if (!offeredServiceIds.includes(serviceId))
      return res.status(404).json({
        message: `Sitter ${sitter.firstName} does not offer selected service`,
      });

    // Checking if there is overlap booking
    const existingBooking = await Booking.findOne({
      where: {
        startDate: startDate,
        endDate: endDate,
        location: location,
        sitterId: sitterId,
        serviceId: serviceId,
        ownerId: logInUserId,
      },
    });
    if (existingBooking)
      return res.status(400).json({
        message: 'There is already a booking with the same time and sitter',
      });
    // Create a booking request if there is not a booking with same time with same dog sitter
    const booking = await Booking.create({
      startDate: startDate,
      endDate: endDate,
      location: location,
      sitterId: sitterId,
      serviceId: serviceId,
      ownerId: logInUserId,
    });
    res.status(201).json({ message: 'Booking created successfully!', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Update booking status (accept or denied - done by sitter || cancel - done by owner)  */
const updateBookingStatus = async (req, res) => {
  // Get the role of the request user
  const { role } = req.user;
  let allowedStatuses = [];

  try {
    // Find the booking from the database
    const booking = await Booking.findOne({
      where: {
        uuid: req.params.bookingId,
      },
    });
    // If the booking is not found
    if (!booking)
      return res.status(404).json({ message: 'Booking is not found' });
    // Check the booking's current status
    const updatedStatus = req.body.status.toLowerCase();
    const canUpdate = booking.status === 'pending';
    // Check role of request user and update the allowed status based on user's role
    if (role === 'sitter') {
      allowedStatuses = ['confirmed', 'denied'];
    } else if (role === 'owner') {
      allowedStatuses = ['cancelled'];
    }
    if (!canUpdate || !allowedStatuses.includes(updatedStatus))
      return res.status(400).json({
        message: `You are not allowed to update booking status to ${updatedStatus}`,
      });

    // Update status of the booking
    await booking.update({
      status: updatedStatus,
    });
    await booking.save();
    res.status(201).json({ message: 'Status updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set the booking status completed by comparing today with the end date with confirmed bookings
const setBookingsToCompleted = async (req, res, next) => {
  const loginUser = req.user;
  const today = new Date().toISOString();
  console.log(`TODAY IS ${today}`);

  const updatedField = loginUser.role === 'owner' ? 'ownerId' : 'sitterId';

  try {
    await Booking.update(
      { status: 'completed' },
      {
        where: {
          status: 'confirmed',
          [updatedField]: loginUser.userId,
          endDate: {
            [Op.lte]: today, // Compare endDate with the current date and time
          },
        },
      }
    );
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't update the bookings" });
  }
};

// Get all of login user's bookings
const getMyBookings = async (req, res) => {
  const logInUser = req.user;

  try {
    // If the logged-in user is the owner
    if (logInUser.role === 'owner') {
      const bookings = await Booking.findAll({
        where: {
          ownerId: logInUser.userId,
        },
        include: [
          {
            model: User,
            as: 'sitter',
            attributes: ['firstName', 'lastName'],
          },
          {
            model: User,
            as: 'owner',
            attributes: ['firstName', 'lastName'],
          },
          {
            model: Review,
          },
        ],
      });
      res.status(200).json(bookings);
    }
    // If the logged-in user is the sitter
    if (logInUser.role === 'sitter') {
      const bookings = await Booking.findAll({
        where: {
          sitterId: logInUser.userId,
        },
        include: [
          {
            model: User,
            as: 'sitter',
            attributes: ['firstName', 'lastName'],
          },
          {
            model: User,
            as: 'owner',
            attributes: ['firstName', 'lastName'],
          },
          {
            model: Review,
          },
        ],
      });
      res.status(200).json(bookings);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a booking by id
const getBookingById = async (req, res) => {
  const { role } = req.user;
  try {
    const result = await Booking.findOne({
      where: {
        uuid: req.params.bookingId,
      },
      include: [
        {
          model: User,
          as: 'sitter',
          attributes: ['firstName', 'lastName'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Review,
        },
      ],
    });
    if (!result)
      return res.status(404).json({ message: "Can't find the booking" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return confirmed bookings of a sitter
const getConfirmedBookings = async (req, res) => {
  try {
    const result = await Booking.findAll({
      where: {
        sitterId: req.params.sitterId,
        status: 'confirmed',
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return completed bookings of a sitter
const getCompletedBookings = async (req, res) => {
  try {
    const result = await Booking.findAll({
      where: {
        sitterId: req.params.sitterId,
        status: 'completed',
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return pending bookings of a sitter
const getPendingBookings = async (req, res) => {
  try {
    const result = await Booking.findAll({
      where: {
        sitterId: req.params.sitterId,
        status: 'pending',
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  updateBookingStatus,
  getMyBookings,
  getConfirmedBookings,
  setBookingsToCompleted,
  getCompletedBookings,
  getPendingBookings,
  getBookingById,
};
