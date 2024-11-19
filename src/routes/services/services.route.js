const express = require('express');
const {
  getServicesByUserId,
  createService,
  updateService,
  deleteService,
  addServiceToSitter,
  getServices,
} = require('./services.controller');
const { verifyToken, adminOnly } = require('../auth/auth.middleware');

const serviceRouter = express.Router();

serviceRouter.post('/api/v1/services', verifyToken, adminOnly, createService);
serviceRouter.get('/api/v1/services', getServices);
serviceRouter.patch('/api/v1/services/:id', updateService);
serviceRouter.delete('/api/v1/users/:id', deleteService);

module.exports = serviceRouter;
