const { Message } = require('../../models/index');

// Get log in user's message
const getMyMessages = async (req, res) => {
  const loginUser = req.user;
  const receiverId = req.params.id;
  try {
    const messages = await Message.findAll({
      where: {
        senderId: loginUser.userId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a message
const createMessage = async (req, res) => {
  const loginUser = req.user;
  try {
    const message = await Message.create({
      content: req.body.content,
      senderId: loginUser.userId,
      receiverId: req.params.receiverId,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMessage, getMyMessages };
