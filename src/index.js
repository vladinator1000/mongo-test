import express, { json } from 'express'
import mongoose from 'mongoose'

import { timestampRouter } from './resources/timestamp/timestamp.js'
import { shortUrlRouter } from './resources/shortUrl/shortUrl.js'
import { authorization, authRouter } from './resources/auth/auth.js'
import config from './config.js'

export const app = express()

app.use(json())
app.use('/timestamp', timestampRouter)
app.use('/shorturl', authorization, shortUrlRouter)
app.use('/', authRouter)

mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('error', console.error)

const PORT = 3020
app.listen(PORT, () => console.log('Server listening on port ' + PORT))
