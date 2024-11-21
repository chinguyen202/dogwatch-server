const express = require('express');
const {
  getServicesByUserId,
  createService,
  updateService,
  deleteService,
  getServices,
} = require('./services.controller');
const { verifyToken, adminOnly } = require('../auth/auth.middleware');

const serviceRouter = express.Router();

/** Manage create, edit, delete and create operation to services */
serviceRouter.post('/api/v1/services', verifyToken, adminOnly, createService);
serviceRouter.get('/api/v1/services', verifyToken, getServices);
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
