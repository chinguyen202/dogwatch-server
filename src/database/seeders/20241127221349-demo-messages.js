'use strict';
const { v4: uuidv4 } = require('uuid');

const sampleMessages = [
  "Hi! I wanted to discuss some of the special needs so you're aware before you stay with the dog.",
  "I'm happy to chat. I want to make sure the dog is comfortable and well-cared for. What specific needs should I keep in mind?",
  'Great, thank you! The dog can be a bit anxious, especially when in unfamiliar places. It’s important to provide a calm environment. Would that be manageable?',
  'Absolutely, I completely understand. I have experience working with anxious dogs. I can set up a quiet space with a comfy bed and some calming music if needed. Does the dog have any specific triggers?',
  'That sounds perfect, thank you. The dog tends to get anxious around sudden loud noises. When that happens, it responds well to gentle reassurance or a toy or treat.',
  "Got it, I'll make sure to keep an eye out and provide some positive distractions if the dog seems stressed. Are there any particular toys or treats the dog likes?",
  'The dog loves a chew toy shaped like a donut and is a big fan of freeze-dried treats. I can pack those. Also, the dog is used to a routine with walks twice a day. It helps the dog feel more secure.',
  "Perfect, I’ll stick to the dog's routine as closely as possible. I’ll take the dog on quiet walks in low-traffic areas to avoid too much noise. Is there anything specific I should know about their walking behavior?",
  'The dog sometimes pulls on the leash when nervous or excited. A gentle tug and a calming word usually help. And one last thing, the dog is on a special diet, so no extra treats beyond what I provide.',
  'Noted—only special treats, nothing else. Thank you for sharing all this. I want to make sure the dog feels at ease and well-loved while with me.',
  "Thanks so much, I feel much better knowing you'll be caring for the dog. I’ll provide a list of this information and their food when I drop them off.",
  'That sounds great. Looking forward to spending time with the dog. See you soon!',
  'See you soon. Thanks again!',
  "I’m so glad we could connect! Just wanted to check in and see if there’s anything else I should know about the dog's care.",
  'The dog loves being outside, but can get nervous in crowded places. Is there a quieter spot nearby where I can take them for walks?',
  'I can’t wait to meet the dog! Just wanted to confirm the feeding schedule for when I look after them.',
  'I’m so excited to take care of the dog. What’s the best way to approach them when I first arrive?',
  'The dog is very social, but sometimes gets scared around other pets. How do they behave around other dogs or animals?',
  'I’ll make sure to keep the dog entertained with some fun games. What’s their favorite activity or game?',
  'The dog has a favorite blanket that helps them feel safe. Can I bring it along, or would it be better to keep them in a new space?',
  'It’s good to know the dog has specific needs when it comes to food. Are there any allergies or sensitivities I should be aware of?',
  'Does the dog enjoy car rides, or should I avoid taking them in the car unless absolutely necessary?',
  'I’d love to know if there’s a particular routine or time the dog prefers for naps or bedtime.',
  'I’m looking forward to taking care of the dog while you’re away! Do they have any favorite spots to sleep or relax?',
  'I’ll take extra care to make sure the dog’s anxiety is managed. How do they usually respond to being left alone for a while?',
  'I’ll keep the dog’s routine as consistent as possible. How do they feel about strangers or new environments?',
  'I’m excited to look after the dog! Do they need any special attention when it comes to grooming or baths?',
  'I’ve taken care of anxious dogs before, so I’m confident I can help them feel comfortable. Does the dog have any favorite calming methods?',
  'I know that dogs can be creatures of habit. How do they respond to changes in their environment, such as new furniture or spaces?',
  'I’d like to make sure I provide the best care possible. Does the dog have any favorite spots to be scratched or petted?',
  'I’ll make sure to keep the dog engaged during walks. Are they good with other animals they might encounter outside?',
  'I’ll follow the dog’s walking routine and make sure they get plenty of exercise. Should I avoid certain areas when walking them?',
  'It would be helpful to know if the dog gets along well with children or other pets before I bring them into my home.',
  'I’d love to know if the dog has a specific spot they like to hang out in during the day. Should I set up their area before I start caring for them?',
  'I’m happy to help with the dog’s care. Would you like me to send regular updates or photos to keep you posted on how they’re doing?',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */

    try {
      // Fetch completed bookings from the database
      const bookings = await queryInterface.sequelize.query(
        `SELECT * FROM bookings;`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      const chats = bookings.map((booking) => {
        const { ownerId, sitterId } = booking;
        // Random choose the receiver
        const isOwnerReceiver = Math.random() > 0.5;
        const receiverId = isOwnerReceiver ? ownerId : sitterId;
        const senderId = isOwnerReceiver ? sitterId : ownerId;

        const message = {
          uuid: uuidv4(),
          content:
            sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
          receiverId: receiverId,
          senderId: senderId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return message;
      });
      return await queryInterface.bulkInsert('messages', chats);
    } catch (error) {
      console.log(`ERROR WHEN SEEDING DATA: ${error}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('messages', null, {});
  },
};
