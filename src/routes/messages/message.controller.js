const { Op, sequelize, fn } = require('sequelize');

const { Message, User } = require('../../models/index');
const { io } = require('../../config/socket');
const { groupMessages } = require('../../utils/messageUtils');

// Get log in user's message (including send and receive),group by senderId
const getMyMessages = async (req, res) => {
  const loginUser = req.user;
  try {
    let messages = await Message.findAll({
      where: {
        [Op.or]: [
          { receiverId: loginUser.userId },
          { senderId: loginUser.userId },
        ],
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['uuid', 'firstName', 'lastName'],
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['uuid', 'firstName', 'lastName'],
        },
      ],
    });

    // Group messages
    messages = groupMessages(messages);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get message from a specific user
const getMessagesFromId = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const roomId = [id, userId].sort().join('');
  console.log(`MESSAGE: roomID is ${roomId}`);
  try {
    const messages = await Message.findAll({
      where: {
        roomId: roomId,
      },
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
    const message = {
      content: content,
      senderId: userId,
      receiverId: receiverId,
      roomId: roomId,
    };
    await Message.create(message);

    // Emit the message through Socket after it is created
    if (io) {
      io.to(receiverId).emit('sendMessage', message);
    }
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMessage, getMyMessages, getMessagesFromId };
