const express = require('express')
const authController = require('../controllers/authController')
const highscoreController = require('../controllers/highscoreController')
const triviaApiController = require('../controllers/triviaApiController')
const { protect } = require('../middleware/authMiddleware')

const route = express.Router()

// public
route.get('/questions', triviaApiController.findAll)

route.post('/auth/login', authController.login)
route.post('/auth/register', authController.register)

// protected
route.get('/highscores', protect, highscoreController.findAll)
route.post('/highscores', protect, highscoreController.create)

module.exports = route