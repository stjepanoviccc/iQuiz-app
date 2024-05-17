const mongoose = require('mongoose')
const Highscore = require('../models/Highscore')
const User = require('../models/User');

const connectDB = async() => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${con.connection.host}`)
    }
    catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB