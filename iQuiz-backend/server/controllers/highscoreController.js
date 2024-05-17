const highscoreService = require('../services/highscoreService')

exports.create = async (req, res) => {
    try {
        await highscoreService.create(req.body)
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
};

exports.findAll = async (req, res) => {
  try {
      const highscores = await highscoreService.findAll()
      res.status(200).json(highscores)
  } catch (error) {
      res.status(500).send('Internal Server Error')
  }
};