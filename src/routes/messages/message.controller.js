const { Op } = require('sequelize');

const { Message, User } = require('../../models/index');
const { sendMessage } = require('../../config/socket');
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
          attributes: ['uuid', 'firstName', 'lastName', 'avatar'],
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['uuid', 'firstName', 'lastName', 'avatar'],
        },
      ],
    });
    console.log(`LOGIN USER ID IS ${loginUser.userId}`);
    // Group messages
    messages = groupMessages(messages, loginUser.userId);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get message from a specific user
 */
const getMessagesFromId = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { receiverId: id, senderId: userId },
          { senderId: id, receiverId: userId },
        ],
      },
    });
    // Sort messages by 'createdAt' to have a unified conversation flow
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a message
 */
const createMessage = async (req, res) => {
  const { userId } = req.user;
  const { content } = req.body;
  const receiverId = req.params.receiverId;
  try {
    const message = {
      content: content,
      senderId: userId,
      receiverId: receiverId,
    };
    await sendMessage(message);
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMessage, getMyMessages, getMessagesFromId };
