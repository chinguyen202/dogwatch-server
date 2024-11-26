const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const app = require('./app');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Use token
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.userId;
    next();
  } catch (error) {}
});

// Listen to socket events
global.onlineUsers = new Map();

io.on('connection', (socket) => {
  // Handle new client connection
  console.log(`User connected: ${socket.userId}`);
  onlineUsers.set(socket.userId);

  // Create a room for 2 user
  socket.on('joinRoom', function (data) {
    const { roomId } = data;
    socket.join(roomId);
    console.log(`${socket.userId} Joined room ${roomId}`);
  });

  // Handle incoming messages
  socket.on('sendMessage', (data) => {
    console.log(`RECEIVE MESSAGE: ${data}`);
    const onlineReceiver = onlineUsers.get(data.receiverId);
    if (onlineReceiver) {
      socket.to(onlineReceiver).emit('receiveMessage', data);
    }
  });
  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
});

// Listen to port
const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
