const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

// Set up the socket server
let io;
const setupSocketServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Use token authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.SECRET);
      socket.userId = payload.userId;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      next(new Error('Authentication error'));
    }
  });

  // Listen to socket events
  global.onlineUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);
    onlineUsers.set(socket.userId);

    // socket.on('joinRoom', (data) => {
    //   const { roomId } = data;
    //   socket.join(roomId);
    //   console.log(`${socket.userId} joined room ${roomId}`);
    // });

    socket.on('sendMessage', (data) => {
      console.log(`RECEIVE MESSAGE: ${data}`);
      const onlineReceiver = onlineUsers.get(data.receiverId);
      if (onlineReceiver) {
        socket.to(onlineReceiver).emit('receiveMessage', data);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
      onlineUsers.delete(socket.userId); // Remove user from onlineUsers
    });
  });

  return io;
};

module.exports = { setupSocketServer, io };
