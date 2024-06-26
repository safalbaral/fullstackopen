const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB!'))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app



