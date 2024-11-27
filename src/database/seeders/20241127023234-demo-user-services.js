'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    try {
      // Fetch users from the 'Users' table
      const users = await queryInterface.sequelize.query(
        `SELECT uuid FROM users WHERE role = 'sitter';`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Fetch services from the 'Services' table
      const services = await queryInterface.sequelize.query(
        `SELECT uuid FROM services;`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Prepare the bulk insert data for the User_Services join table
      const userServicesData = [
        {
          userUuid: users[0].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[0].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[0].uuid,
          serviceUuid: services[2].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[0].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[1].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[1].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[2].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[2].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[2].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[3].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[3].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[4].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[4].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[4].uuid,
          serviceUuid: services[2].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[5].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[5].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[6].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[6].uuid,
          serviceUuid: services[2].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[7].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[7].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userUuid: users[8].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[8].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[8].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[9].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[9].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[10].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[10].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[11].uuid,
          serviceUuid: services[2].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[11].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[12].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[12].uuid,
          serviceUuid: services[2].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[12].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[13].uuid,
          serviceUuid: services[3].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[13].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[14].uuid,
          serviceUuid: services[1].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[14].uuid,
          serviceUuid: services[0].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userUuid: users[14].uuid,
          serviceUuid: services[2].uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Insert data into User_Services join table
      return await queryInterface.bulkInsert(
        'user_services',
        userServicesData,
        {}
      );
    } catch (error) {
      console.log(`ERROR WHEN SEEDING DATA: ${error}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('user_services', null, {});
  },
};
