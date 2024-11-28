'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    try {
      // Fetch sitters with their services
      const sitters = await queryInterface.sequelize.query(
        `SELECT u.uuid as sitterUuid, u.location, us.serviceUuid
         FROM users u
         JOIN user_services us ON u.uuid = us.userUuid
         WHERE u.role = 'sitter';`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      // fetch owners from the database
      const owners = await queryInterface.sequelize.query(
        `SELECT uuid FROM users WHERE role = 'owner';`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Define date for bookings
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 5);

      // Prepare the bulk insert data
      const bookings = [];

      owners.forEach((owner) => {
        // Random select a sitter
        const randomSitter =
          sitters[Math.floor(Math.random() * sitters.length)];
        // Add a booking in seeding data
        bookings.push({
          uuid: uuidv4(),
          startDate: new Date(startDate),
          endDate: new Date(today),
          location: randomSitter.location,
          status: 'completed',
          serviceId: randomSitter.serviceUuid, // Ensure this sitter provides the service
          sitterId: randomSitter.sitterUuid,
          ownerId: owner.uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      // Insert data into bookings table
      return await queryInterface.bulkInsert('bookings', bookings, {});
    } catch (error) {
      console.log(`ERROR WHEN SEEDING DATA: ${error}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('bookings', null, {});
  },
};
