const { createServer } = require('http');
const { setupSocketServer } = require('./config/socket');

const app = require('./app');

const httpServer = createServer(app);

// Set up Socket.io with the HTTP server
setupSocketServer(httpServer);

// Listen to port
const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
