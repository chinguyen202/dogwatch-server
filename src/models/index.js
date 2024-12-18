const User = require('./user.model');
const Service = require('./service.model');
const Booking = require('./booking.model');
const Review = require('./review.model');
const Message = require('./message.model');

// Service -> User relationship
User.belongsToMany(Service, { through: 'user_services' });
Service.belongsToMany(User, { through: 'user_services' });

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

Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer' });
Review.belongsTo(User, { foreignKey: 'revieweeId', as: 'reviewee' });

// Booking -> Review
Review.belongsTo(Booking, { foreignKey: 'bookingId' });
Booking.hasMany(Review, { foreignKey: 'bookingId' });

// User -> Message
User.hasMany(Message, { foreignKey: 'senderId', as: 'sendMessages' });
User.hasMany(Message, { foreignKey: 'receiverId', as: 'receiveMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

module.exports = { User, Service, Booking, Review, Message };
