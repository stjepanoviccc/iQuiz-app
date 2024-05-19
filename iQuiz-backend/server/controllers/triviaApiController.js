const triviaApiService = require('../services/triviaApiService');

exports.findAll = async (req, res) => {
    try {
        const questions = await triviaApiService.findAll()
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
};