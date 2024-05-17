const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./server/database/connection')
const cors = require('cors');
const route = require('./routes/routes');

const app = express()

dotenv.config({ path: 'config.env' })

const port = process.env.PORT || 3000

connectDB()

app.use(cors())

app.use('/api/v1', route)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});