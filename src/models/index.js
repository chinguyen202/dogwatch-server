const User = require('./user.model');
const Service = require('./service.model');
const Booking = require('./booking.model');
const Review = require('./review.model');
const Message = require('./message.model');

// Service -> User relationship
User.belongsToMany(Service, { through: 'User_Services' });
Service.belongsToMany(User, { through: 'User_Services' });

// User -> Booking association
User.hasMany(Booking, { foreignKey: 'sitterId' });
User.hasMany(Booking, { foreignKey: 'ownerId' });
Booking.belongsTo(User, { foreignKey: 'sitterId', as: 'sitter' });
Booking.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

// Service -> Booking (Service can have many bookings)
Service.hasMany(Booking, { foreignKey: 'serviceId' });

// User -> Review
User.hasMany(Review, { foreignKey: 'reviewerId', as: 'givenReviews' });
User.hasMany(Review, { foreignKey: 'revieweeId', as: 'receivedReviews' });

Review.belongsTo(User, { foreignKey: 'reviewerId' });
Review.belongsTo(User, { foreignKey: 'revieweeId' });

// Booking -> Review
Review.belongsTo(Booking, { foreignKey: 'bookingId' });
Booking.hasMany(Review, { foreignKey: 'bookingId' });

// User -> Message
User.hasMany(Message);
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

module.exports = { User, Service, Booking, Review, Message };
