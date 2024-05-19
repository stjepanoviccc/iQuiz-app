const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (userData) => {
  const user = new User(userData)
  await user.save()
  return { user }
}

exports.login = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid credentials')
  }
  const accessToken = generateToken(username)
  const refreshToken = generateRefreshToken(username)
  return { user, accessToken, refreshToken }
}

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

const generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  })
}

exports.decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET).username
}

exports.verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return decoded.username
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}
