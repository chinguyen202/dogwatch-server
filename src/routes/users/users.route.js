const express = require('express');
const multer = require('multer');

const {
  getSitters,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require('./users.controller');
const {
  getServicesByUserId,
  addServiceToSitter,
  updateServiceByUserId,
} = require('../services/services.controller');
const {
  verifyUser,
  sitterOnly,
  adminOnly,
  verifyToken,
} = require('../auth/auth.middleware');

// Accept only images with certain file types
const fileFilter = (req, file, cb) => {
  const acceptedTypes = ['image/jpeg', 'image/png'];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ dest: 'src/uploads/' }, fileFilter);

const userRouter = express.Router();

userRouter.get('/api/v1/users', getSitters);
userRouter.get('/api/v1/users/:id', getUserById);
userRouter.post('/api/v1/register', createUser);
userRouter.put(
  '/api/v1/users/:id',
  verifyToken,
  upload.single('avatar'),
  updateUser
);
userRouter.delete('/api/v1/users/:id', adminOnly, deleteUser);
// Add a service to the sitter by user ID
// userRouter.post('/api/v1/users/:id/service', sitterOnly, addServiceToSitter);
// Get services by user ID
userRouter.get('/api/v1/users/:id/service', getServicesByUserId);
//Update services to the sitter by user ID
userRouter.post('/api/v1/users/:id/service', sitterOnly, updateServiceByUserId);
// Change password
userRouter.put('/api/v1/users/:id/password', verifyToken, updatePassword);
module.exports = userRouter;
