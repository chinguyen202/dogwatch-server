const socket = require('socket.io');

const socketInit = (server) => {
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log(socket.id);
  });
};

module.exports = socketInit;
