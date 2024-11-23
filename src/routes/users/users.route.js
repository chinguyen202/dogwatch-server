const express = require('express');
const multer = require('multer');

const {
  getSitters,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  searchForSitters,
} = require('./users.controller');
const {
  getServicesByUserId,
  updateServiceByUserId,
} = require('../services/services.controller');
const {
  verifyUser,
  sitterOnly,
  adminOnly,
  verifyToken,
} = require('../auth/auth.middleware');

const userRouter = express.Router();

// Config for photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
// Accept only images with certain file types
const fileFilter = (req, file, cb) => {
  const acceptedTypes = ['image/jpeg', 'image/png'];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

/**  Managing user information */
// Create a new user
userRouter.post('/api/v1/register', createUser);
// Update user info
userRouter.put(
  '/api/v1/users/:id',
  verifyToken,
  upload.single('avatar'),
  updateUser
);
// Change password
userRouter.patch('/api/v1/users/:id', verifyToken, updatePassword);
//Update services to the sitter by user ID
userRouter.post(
  '/api/v1/users/:id/services',
  verifyToken,
  sitterOnly,
  updateServiceByUserId
);

/** Getting user info */
// Get all the sitters on the database
userRouter.get('/api/v1/sitters', getSitters);
// Get the user by id
userRouter.get('/api/v1/users/:id', getUserById);
// Get services by user ID
userRouter.get('/api/v1/users/:id/services', getServicesByUserId);

/** Search */
userRouter.post('/api/v1/search', searchForSitters);
userRouter.delete('/api/v1/users/:id', adminOnly, deleteUser);

module.exports = userRouter;
