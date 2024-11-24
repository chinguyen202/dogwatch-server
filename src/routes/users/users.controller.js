const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { User, Review, Service } = require('../../models/index');
const { makeThumbnail } = require('../../utils/imageUtils');

// Get all sitters
const getSitters = async (req, res) => {
  try {
    const response = await User.findAll({
      where: {
        role: 'sitter',
      },
      include: [
        {
          model: Review,
          as: 'receivedReviews',
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
  // Get login user by token
  const { userId } = req.user;
  // Get request information
  const { firstName, lastName, email, headline, description } = req.body;

  try {
    const updatedUser = await User.findOne({
      where: {
        uuid: userId,
      },
    });
    if (!updateUser)
      return res
        .status(404)
        .json({ message: `Can't found user with id ${userId}` });

    if (req.file) {
      await makeThumbnail(req.file.path, req.file.filename);
    }

    // Update user's information
    await updatedUser.update({
      firstName: firstName ? firstName : updatedUser.firstName,
      lastName: lastName ? lastName : updateUser.lastName,
      email: email ? email : updateUser.email,
      role: updatedUser.role,
      location: updatedUser.location,
      avatar: req.file ? req.file.filename : updatedUser.avatar,
      headline: headline ? headline : updateUser.headline,
      description: description ? description : updateUser.description,
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
  let searchResults;
  try {
    if (rating === 0) {
      searchResults = await User.findAll({
        where: {
          location: location,
          role: 'sitter',
        },
        include: [
          {
            model: Service,
            through: { attributes: [] },
            where: {
              uuid: serviceId,
            },
            required: true,
          },
        ],
      });
    } else {
      searchResults = await User.findAll({
        where: {
          location: location,
          role: 'sitter',
        },
        include: [
          {
            model: Review,
            as: 'receivedReviews',
            where: {
              rating: rating,
            },
            required: true,
          },
          {
            model: Service,
            through: { attributes: [] },
            where: {
              uuid: serviceId,
            },
            required: true,
          },
        ],
      });
    }

    res.status(200).json(searchResults);
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
