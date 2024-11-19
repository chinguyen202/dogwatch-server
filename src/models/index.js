const User = require('./user.model');
const Service = require('./service.model');
const Booking = require('./booking.model');
const Review = require('./review.model');
const Message = require('./message.model');

// Service -> User relationship
User.belongsToMany(Service, { through: 'User_Services' });
Service.belongsToMany(User, { through: 'User_Services' });

// User -> Booking association
User.hasMany(Booking, { foreignKey: 'sitterId', as: 'Sitters' });
User.hasMany(Booking, { foreignKey: 'ownerId', as: 'Owners' });
Booking.belongsTo(User, { foreignKey: 'sitterId' });
Booking.belongsTo(User, { foreignKey: 'ownerId' });

// Service -> Booking (Service can have many bookings)
Service.hasMany(Booking, { foreignKey: 'serviceId' });

// User -> Message
User.hasMany(Message);
Message.belongsTo(User, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'receiverId' });

// User -> Review
User.hasMany(Review, { foreignKey: 'reviewerId', as: 'givenReviews' });
User.hasMany(Review, { foreignKey: 'revieweeId', as: 'receivedReviews' });

Review.belongsTo(User, { foreignKey: 'reviewerId' });
Review.belongsTo(User, { foreignKey: 'revieweeId' });
Review.belongsTo(Booking, { foreignKey: 'bookingId' });

module.exports = { User, Service, Booking, Review, Message };
