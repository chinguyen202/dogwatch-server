const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
// Listen to socket events
const userSocketMap = new Map();
io.on('connection', (socket) => {
  // Handle new client connection
  console.log(`User connected: ${socket.id}`);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(String(userId), socket.id);
    console.log(`User ${userId} connected on socket ${socket.id}`);
  } else {
    console.log(`User connected on socket ${socket.id} without userId`);
  }
  // Handle incoming messages
  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('receiveMessage', data);
  });
  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// Listen to port
const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
