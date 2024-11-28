const { createServer } = require('http');
const { setupSocket } = require('./config/socket');

const app = require('./app');

const httpServer = createServer(app);

// Listen to port
const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Set up Socket.io with the HTTP server
setupSocket(httpServer);
