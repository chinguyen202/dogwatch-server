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
        `SELECT id FROM users WHERE role = 'sitter';`,
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
          userId: users[0].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[0].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[0].id,
          serviceId: services[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[0].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[1].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[1].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[2].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[2].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[2].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[3].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[3].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[4].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[4].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[4].id,
          serviceId: services[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[5].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[5].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[6].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[6].id,
          serviceId: services[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[7].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[7].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: users[8].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[8].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[8].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[9].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[9].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[10].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[10].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[11].id,
          serviceId: services[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[11].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[12].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[12].id,
          serviceId: services[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[12].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[13].id,
          serviceId: services[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[13].id,
          serviceId: services[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[14].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[15].id,
          serviceId: services[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[15].id,
          serviceId: services[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Insert data into User_Services join table
      return await queryInterface.bulkInsert(
        'User_Services',
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
    await queryInterface.bulkDelete('User_Services', null, {});
  },
};
