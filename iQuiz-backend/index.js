const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');
const connectDB = require('./server/database/connection')
const route = require('./server/routes/routes')

const app = express()

dotenv.config({ path: 'config.env' })

const port = process.env.PORT || 3000
const front_port = process.env.FRONT_PORT || 5173

connectDB()

app.use(bodyParser.json())

app.use(cors({ origin: `http://localhost:${front_port}`,  credentials: true }));

app.use('/api/v1', route)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
  console.log(`Server is accepting requests from http://localhost:${front_port}`)
});