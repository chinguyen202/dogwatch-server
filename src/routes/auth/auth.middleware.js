const jwt = require('jsonwebtoken');

// Verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Forbidden access when verify token' });
  }
};

// Check if user is admin
const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    // console.log(`token is ${token}`);
    req.user = decoded;
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Only admin is allowed ' });
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden access' });
  }
};

// Check if user is sitter
const sitterOnly = async (req, res, next) => {
  try {
    if (req.user.role !== 'sitter')
      return res
        .status(403)
        .json({ message: 'Only dog sitter can perform this action' });
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden access' });
  }
};

// Check if user is owner
const ownerOnly = async (req, res, next) => {
  try {
    if (req.user.role !== 'owner')
      return res
        .status(403)
        .json({ message: 'Only dog owner can perform this action' });
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden access' });
  }
};

module.exports = { verifyToken, ownerOnly, sitterOnly, adminOnly };
