const express = require('express')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

const app = express()

const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
})

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cors())
app.use(helmet({crossOriginEmbedderPolicy: false}))
app.use(limiter)

app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes)

module.exports = app