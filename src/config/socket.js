const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { Message } = require('../models/index');

const userSocketMap = new Map();
let io;
/**
 * Set up the socket server
 */
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

  /**
   * Handle connection
   */
  io.on('connection', (socket) => {
    // Get the userId and add it to userSocketMap
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID ${socket.id}`);
    } else {
      console.log('User ID is not provided during connection.');
    }
    // on sendMessage
    socket.on('sendMessage', sendMessage);

    // on disconnect
    socket.on('disconnect', () => disconnect(socket));
  });

  return io;
};

/**
 * Handle send message
 */

const sendMessage = async (message) => {
  // get sender and receiver socket id from socket map
  const senderSocketId = userSocketMap.get(message.senderId);
  const receiverSocketId = userSocketMap.get(message.receiverId);
  // Add the message to the database
  await Message.create(message);
  // If user is connected to socket, emit message to user
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
