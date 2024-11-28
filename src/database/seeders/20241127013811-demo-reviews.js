'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    try {
      // Fetch completed bookings from the database
      const bookings = await queryInterface.sequelize.query(
        `SELECT * FROM bookings WHERE status = 'completed';`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      // Sample reviews
      const sampleReviews = [
        'Great service, my dog loved the sitter!',
        'Very punctual and caring.',
        'The sitter did an amazing job!',
        'Not very satisfied with the service.',
        'Would definitely book again!',
        'My pet seemed stressed when I returned.',
        'Excellent communication and care.',
        'Highly recommended!',
        'Average experience overall.',
        'Above and beyond expectations!',
        'Excellent service! My dog came back happy and well-exercised.',
        'The sitter was very punctual and professional. Highly recommend!',
        'Very caring and attentive. My pet felt comfortable right away.',
        'Not fully satisfied with the communication, but the care was good.',
        'Above and beyond expectations! They even sent regular updates.',
        'Kept my dog safe and entertained. Would definitely book again.',
        'Average experience overall. Expected a bit more engagement.',
        'Fantastic experience. Great attention to detail and care.',
        'The sitter seemed experienced, but my dog was a bit stressed afterward.',
        'Outstanding service! My dog loved the long walks and playtime.',
        'A bit disappointed. There was a delay in updates, but my pet was okay.',
        'Superb! Regular photos and messages gave me peace of mind.',
        'The service was good, but my pet seemed a little anxious afterward.',
        'Great experience. The sitter followed all the instructions perfectly.',
        'Good but not exceptional. My dog missed a meal, but otherwise fine.',
        'Truly caring and patient. My pet felt right at home.',
        'Professional and friendly. Will definitely use this service again.',
        'Not the best experience. There were some issues with timing.',
        'Top-notch! My dog was well taken care of and looked happy.',
        'Good overall, but they could improve on response time.',
        "The sitter showed great understanding of my pet's needs.",
        'Excellent communication. I appreciated the detailed updates.',
        'Satisfactory, but I was hoping for more interaction time.',
        'Fantastic care! They treated my dog like their own.',
        'Highly recommended for anyone looking for reliable care.',
        'Decent service, but could be more organized.',
        'The sitter was knowledgeable and my pet seemed well-cared for.',
        'Friendly and professional. Made the whole process easy.',
        'There were a few hiccups, but overall it was a good experience.',
        'Exceeded my expectations. My pet came back happy and relaxed.',
      ];

      // Generate random reviews
      const reviewsData = bookings.map((booking) => ({
        uuid: uuidv4(),
        bookingId: booking.uuid,
        revieweeId: booking.sitterId,
        reviewerId: booking.ownerId,
        rating: Math.floor(Math.random() * 3) + 3, // Random rating between 1 and 5
        comment:
          sampleReviews[Math.floor(Math.random() * sampleReviews.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Insert generated reviews into the database
      await queryInterface.bulkInsert('reviews', reviewsData, {});
    } catch (error) {
      console.log(`ERROR WHEN SEEDING DATA: ${error}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('reviews', null, {});
  },
};
