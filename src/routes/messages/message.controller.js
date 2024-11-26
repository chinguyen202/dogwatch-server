const sequelize = require('sequelize');

const { Message } = require('../../models/index');

// Get log in user's message,group by senderId
const getMyMessages = async (req, res) => {
  const loginUser = req.user;
  try {
    const messages = await Message.findAll({
      where: {
        receiverId: loginUser.userId,
      },
      attributes: [
        'roomId',
        [sequelize.fn('COUNT', 'senderId'), 'countSender'],
      ],
      group: ['roomId'],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get message from a specific user
const getMessages = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const roomId = [id, userId].sort().join('');
  console.log(`MESSAGE: roomID is ${roomId}`);
  try {
    const messages = await Message.findAll({
      where: {
        roomId: roomId,
      },
      order: [['createdAt', 'DESC']],
    });
    // Sort messages by 'createdAt' to have a unified conversation flow
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** Create a message*/
const createMessage = async (req, res) => {
  const { userId } = req.user;
  const { content } = req.body;
  const receiverId = req.params.receiverId;
  const roomId = [userId, receiverId].sort().join('');
  console.log(`MESSAGE: roomID is ${roomId}`);
  try {
    const message = await Message.create({
      content: content,
      senderId: userId,
      receiverId: receiverId,
      roomId: roomId,
    });
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMessage, getMyMessages, getMessages };
