const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
  const user = new User(userData);
  await user.save();
  const token = generateToken(user._id);
  return { user, token };
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid credentials');
  }
  const token = generateToken(user._id);
  return { user, token };
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};