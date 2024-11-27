const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { Message } = require('../models/index');

const userSocketMap = new Map();
let io;
// Set up the socket server

const setupSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  /**
   * Handle disconnect
   */
  const disconnect = (socket) => {
    console.log(`Socket disconnected ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID ${socket.id}`);
    } else {
      console.log('User ID is not provided during connection.');
    }

    socket.on('sendMessage', sendMessage);

    socket.on('disconnect', () => disconnect(socket));
  });

  return io;
};

/**
 * Handle send message
 */

const sendMessage = async (message) => {
  console.log(`MESSAGE ${JSON.stringify(message)}`);
  const senderSocketId = userSocketMap.get(message.senderId);
  const receiverSocketId = userSocketMap.get(message.receiverId);
  console.log(`RECEIVER SOCKET IS ${receiverSocketId}`);
  console.log(`SENDER SOCKET  IS ${receiverSocketId}`);

  await Message.create(message);
  if (receiverSocketId) {
    console.log(`RECEIVER SOCKET IS ${receiverSocketId}`);
    io.to(receiverSocketId).emit('receiveMessage', message);
  }
  if (senderSocketId) {
    console.log(`SENDER SOCKET  IS ${receiverSocketId}`);
    io.to(senderSocketId).emit('sendMessage', message);
  }
};

module.exports = { setupSocket, sendMessage };
