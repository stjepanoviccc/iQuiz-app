const Highscore = require('../models/Highscore');

exports.create = async (highscoreData) => {
    try {
        const newHighscore = new Highscore(highscoreData)
        await newHighscore.save()
        return { success: true }
    } catch (error) {
        console.error('Error saving highscore:', error)
        throw error
    }
};

exports.findAll = async () => {
    try {
        const highscores = await Highscore.find()
        return highscores
    } catch (error) {
        console.error('Error fetching highscores:', error)
        throw error
    }
};