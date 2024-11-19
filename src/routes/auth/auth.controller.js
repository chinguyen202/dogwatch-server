const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/index');

// User login
const logIn = async (req, res) => {
  try {
    // Find the user from the database by email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // If no user found, send an error message
    if (!user)
      return res
        .status(404)
        .json({ message: `User with email ${req.body.email} does not exist` });

    // Compare password and send error message
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });

    // generate a signed son web token with some of the contents of user object and return it in the response
    const userInfo = {
      uuid: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      location: user.location,
      avatar: user.avatar,
      bio: user.bio,
      description: user.description,
    };

    const token = jwt.sign(userInfo, process.env.SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user }); //TODO: remove user from response
  } catch (error) {
    console.log(`Error when trying to log in`);
    res.status(500).json({ message: error.message });
  }
};

// User logout
const logOut = (req, res) => {
  req.user.destroy((error) => {
    if (error) return res.status(400).json({ message: "Can't log out" });
    res.status(200).json({ message: 'Logout successfully!' });
  });
};

module.exports = { logIn, logOut };
