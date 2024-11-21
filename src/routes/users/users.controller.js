const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { User, Review, Service } = require('../../models/index');

// Get all sitters
const getSitters = async (req, res) => {
  try {
    const response = await User.findAll({
      where: {
        role: 'sitter',
      },
      attributes: {
        exclude: ['password'], // Excludes the 'password' field from the response
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific user with their received reviews and services offered
const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: Review,
          as: 'receivedReviews',
        },
        {
          model: Service,
          through: { attributes: [] },
        },
      ],
      attributes: {
        exclude: ['password'], // Excludes the 'password' field from the response
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new user
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role, location } = req.body;
  const hashPassword = await argon2.hash(password);
  try {
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      role: role,
      location: location,
      avatar: null,
      headline: null,
      description: null,
    });

    const token = jwt.sign(
      { userId: user.uuid, role: user.role },
      process.env.SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({
      message: 'Register success',
      token,
      userId: user.uuid,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    // Get login user by token
    const loginUser = req.user;
    console.log(loginUser);

    const updatedUser = await User.findOne({
      where: {
        uuid: loginUser.userId,
      },
    });

    // Update user's information
    await updatedUser.update({
      firstName: req.body.firstName ? req.body.firstName : loginUser.firstName,
      lastName: req.body.lastName ? req.body.lastName : loginUser.lastName,
      email: req.body.email ? req.body.email : loginUser.email,
      role: loginUser.role,
      location: loginUser.location,
      avatar: req.file ? req.file.filename : loginUser.avatar, // If file is provided, update avatar
      headline: req.body.bio ? req.body.headline : loginUser.headline,
      description: req.body.description
        ? req.body.description
        : loginUser.description,
    });
    await updatedUser.save();
    res.status(201).json({ message: `User updated` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update password
const updatePassword = async (req, res) => {
  try {
    const loginUser = req.user;
    const updatedUser = await User.findOne({
      where: {
        uuid: loginUser.userId,
      },
    });
    // Compare password and send error message
    const match = await argon2.verify(
      updatedUser.password,
      req.body.currentPassword
    );
    if (!match)
      return res.status(400).json({ message: 'Incorrect current password' });
    // Has new password and update it
    const newHashPassword = await argon2.hash(req.body.newPassword);
    await updatedUser.update({
      password: newHashPassword,
    });
    await updatedUser.save();
    res.status(201).json({ message: 'Password is updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search for sitter using service, location and rating
const searchForSitters = async (req, res) => {
  const { serviceId, location, rating } = req.body;
  try {
    const result = await User.findAll({
      where: {
        location: location,
      },
      include: [
        {
          model: Review,
          as: 'receivedReviews',
          where: {
            rating: rating,
          },
        },
        {
          model: Service,
          through: { attributes: [] },
          where: {
            uuid: serviceId,
          },
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: 'User is not found' });
  try {
    await User.destroy({
      where: {
        uuid: user.uuid,
      },
    });
    res.status(201).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSitters,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  searchForSitters,
};
