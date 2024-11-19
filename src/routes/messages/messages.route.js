const express = require('express');
const { verifyToken } = require('../auth/auth.middleware');
const { createMessage } = require('./message.controller');

const messageRouter = express.Router();

messageRouter.post('/api/v1/messages/:receiverId', verifyToken, createMessage);

module.exports = messageRouter;
