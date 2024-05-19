const authService = require('../services/authService')
const { validationResult } = require('express-validator')

exports.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { username, password } = req.body
    const { user } = await authService.register({ username, password })
    res.status(201).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { username, password } = req.body
    const { user, accessToken, refreshToken } = await authService.login(username, password)
    res.status(200).json({ user, accessToken, refreshToken })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};