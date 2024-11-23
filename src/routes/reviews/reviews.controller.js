const { Review, Booking } = require('../../models');

// Create a review
// Only allowed if the log in user create a review for a booking which is already completed
const createReview = async (req, res) => {
  const loginUser = req.user;
  try {
    // Find the booking
    const booking = await Booking.findOne({
      where: {
        uuid: req.params.bookingId,
      },
    });
    if (!booking)
      return res.status(400).json({ message: 'Booking is not found' });
    // Check the booking status, only allow to review if the booking is completed
    const isBookingCompleted = booking.status === 'completed';
    if (!isBookingCompleted)
      return res
        .status(400)
        .json({ message: 'Review is not allowed for unfinished booking.' });
    // Create the review
    // The login user is the one who create the review
    // If the login user is the owner in the booking, the reviewee is the dog sitter
    // Otherwise, the reviewee is the dog owner
    const result = await Review.create({
      rating: req.body.rating,
      comment: req.body.comment,
      bookingId: booking.uuid,
      reviewerId: loginUser.userId,
      revieweeId:
        loginUser.userId === booking.ownerId
          ? booking.sitterId
          : booking.ownerId,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a review
const editReview = async (req, res) => {
  const loginUser = req.user;
  try {
    const editReview = await Review.findOne({
      where: {
        uuid: req.params.reviewId,
        reviewerId: loginUser.userId,
      },
    });
    await editReview.update({
      rating: req.body.rating,
      comment: req.body.comment,
    });
    await editReview.save();
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a list of all review about log in user (reviewee)
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        revieweeId: req.user.userId,
      },
    });
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getMyReviews, editReview };
