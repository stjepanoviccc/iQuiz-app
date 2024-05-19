const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');
const connectDB = require('./server/database/connection')
const route = require('./server/routes/routes')

const app = express()

dotenv.config({ path: 'config.env' })

const port = process.env.PORT || 3000

connectDB()

app.use(bodyParser.json())

const corsOptions = {
  origin: 'http://127.0.0.1',
  credentials: true,
}

app.use(cors(corsOptions))

app.use('/api/v1', route)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});