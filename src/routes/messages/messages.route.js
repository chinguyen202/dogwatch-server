const express = require('express');
const { verifyToken } = require('../auth/auth.middleware');
const {
  createMessage,
  getMessagesFromId,
  getMyMessages,
} = require('./message.controller');

const messageRouter = express.Router();

messageRouter.post('/api/v1/messages/:receiverId', verifyToken, createMessage);
messageRouter.get('/api/v1/messages/:id', verifyToken, getMessagesFromId);
messageRouter.get('/api/v1/messages', verifyToken, getMyMessages);

module.exports = messageRouter;
