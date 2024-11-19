const { Message } = require('../../models/index');

const getMyMessages = (req, res) => {};

const createMessage = async (req, res) => {
  const loginUser = req.user;
  try {
    const message = await Message.create({
      content: req.body.content,
      senderId: loginUser.uuid,
      receiverId: req.params.receiverId,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMessage, getMyMessages };
