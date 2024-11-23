const { where, NOW, Op, DATE } = require('sequelize');
const { Booking, User, Service } = require('../../models/index');

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

// TODO: Complete the booking, somehow update the status of the booking automatically
// Can make this called before user get their bookings
// Why is the database date is not working
const setBookingsToCompleted = async (req, res, next) => {
  const loginUser = req.user;
  const updatedField = loginUser.role === 'owner' ? 'ownerId' : 'sitterId';
  console.log(new DATE());

  try {
    await Booking.update(
      { status: 'completed' },
      {
        where: {
          status: 'confirmed',
          [updatedField]: loginUser.userId,
          endDate: {
            [Op.lte]: new DATE(), // Compare endDate with the current date
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
    // In case the login user is the owner
    if (logInUser.role === 'owner') {
      const bookings = await Booking.findAll({
        where: {
          ownerId: logInUser.userId,
        },
      });
      res.status(200).json(bookings);
    }
    // In case the login user is the sitter
    if (logInUser.role === 'sitter') {
      const bookings = await Booking.findAll({
        where: {
          sitterId: logInUser.userId,
        },
      });
      res.status(200).json(bookings);
    }
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

module.exports = {
  createBooking,
  updateBookingStatus,
  getMyBookings,
  getConfirmedBookings,
  setBookingsToCompleted,
};
