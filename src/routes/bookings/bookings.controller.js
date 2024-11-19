const { Booking, User, Service } = require('../../models/index');

// Create a booking ( done by log in user who is dog owner)
const createBooking = async (req, res) => {
  const { startDate, endDate, location, serviceId, sitterId } = req.body;
  const logInUser = req.user;
  const ownerId = logInUser.uuid;
  console.log(`OwnerId is ${ownerId}`);
  console.log(`Log in user : ${logInUser}`);
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
    console.log(`Type ${typeof offeredServiceIds}`);

    // If the service is offer by the sitter
    if (!offeredServiceIds.includes(serviceId))
      return res.status(400).json({
        message: `Sitter ${sitter.firstName} does not offer selected service`,
      });

    // Create a booking request
    const newBooking = await Booking.create({
      startDate,
      endDate,
      location,
      serviceId,
      sitterId,
      ownerId,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status (accept or denied - done by sitter)
const updateBookingStatus = async (req, res) => {
  console.log(`User role is ${req.user.role}`);
  const { status } = req.body;
  try {
    // Find the booking from the database
    const booking = await Booking.findOne({
      where: {
        uuid: req.params.bookingId,
      },
    });
    // If the booking is not found
    if (!booking)
      return res.status(400).json({ message: 'Booking is not found' });
    // Not allow to update status when the booking is completed or has been denied or new status is
    if (booking.status === 'denied' || booking.status === 'completed')
      return res
        .status(400)
        .json(
          'Completed booking or denied booking is not allowed to update status'
        );
    // Update status of the booking
    await booking.update({
      status: status,
    });
    await booking.save();
    res.status(201).json({ message: 'Status updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
          ownerId: logInUser.uuid,
        },
      });
      res.status(200).json(bookings);
    }
    // In case the login user is the sitter
    if (logInUser.role === 'sitter') {
      const bookings = await Booking.findAll({
        where: {
          sitterId: logInUser.uuid,
        },
      });
      res.status(200).json(bookings);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, updateBookingStatus, getMyBookings };
