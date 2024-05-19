const axios = require('axios');

const API_URL = process.env.API_URL || ""

exports.findAll = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data.results
    } catch (error) {
        console.error('Error fetching questions from API:', error)
        throw error
    }
};