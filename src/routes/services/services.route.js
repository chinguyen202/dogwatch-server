const express = require('express');
const {
  getServicesByUserId,
  createService,
  updateService,
  deleteService,
  getServices,
  getServiceById,
} = require('./services.controller');
const { verifyToken, adminOnly } = require('../auth/auth.middleware');

const serviceRouter = express.Router();

/** Manage create, edit, delete and create operation to services */
// Get all the services available
serviceRouter.get('/api/v1/services', getServices);
// Get one service by its id
serviceRouter.get('/api/v1/services/:id', getServiceById);

// Create a new service (admin only)
serviceRouter.post('/api/v1/services', verifyToken, adminOnly, createService);
serviceRouter.put(
  '/api/v1/services/:id',
  verifyToken,
  adminOnly,
  updateService
);
serviceRouter.delete(
  '/api/v1/users/:id',
  verifyToken,
  adminOnly,
  deleteService
);

module.exports = serviceRouter;
