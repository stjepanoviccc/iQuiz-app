const express = require('express')
const authController = require('../controllers/authController')
const highscoreController = require('../controllers/highscoreController')
const triviaApiController = require('../controllers/triviaApiController')
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware');

const route = express.Router()

// public
route.get('/questions', triviaApiController.findAll);

route.post('/auth/login', authController.login);
route.post('/auth/register', authController.register);

// protected
route.get('/highscore', protect, highscoreController.findAll);
route.post('/highscore', protect, highscoreController.create);

route.get('/users/:id', protect, userController.findById);
route.put('/users/:id', protect, userController.update);

module.exports = route