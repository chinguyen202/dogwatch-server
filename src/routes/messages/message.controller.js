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
      order: [['createdAt', 'DESC']],
    });
    // Group messages by senderId
    const groupedMessages = messages.reduce((acc, message) => {
      const senderId = message.senderId;
      if (!acc[senderId]) {
        acc[senderId] = [];
      }
      acc[senderId].push(message);
      return acc;
    }, {});
    res.status(200).json({ success: true, groupedMessages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get message from a specific user
const getMessages = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const inMessages = await Message.findAll({
      where: {
        senderId: id,
        receiverId: userId,
      },
      order: [['createdAt', 'DESC']],
    });
    const outMessages = await Message.findAll({
      where: {
        senderId: userId,
        receiverId: id,
      },
      order: [['createdAt', 'DESC']],
    });
    // Merge both message arrays
    const allMessages = [...inMessages, ...outMessages];

    // Sort messages by 'createdAt' to have a unified conversation flow
    allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    res.status(200).json({ success: true, allMessages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a message
const createMessage = async (req, res) => {
  const { userId } = req.user;
  try {
    const message = await Message.create({
      content: req.body.content,
      senderId: userId,
      receiverId: req.params.receiverId,
    });
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMessage, getMyMessages, getMessages };
