'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    try {
      return await queryInterface.bulkInsert('Service', [
        {
          name: 'Boarding',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Dog Walking',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'House Sitting',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Daycare',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log(`ERROR WHEN SEEDING SERVICE: ${error}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Service', null, {});
  },
};
