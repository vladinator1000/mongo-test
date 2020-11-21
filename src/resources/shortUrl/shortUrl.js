import { createHash } from 'crypto'
import { Router } from 'express'
import mongoose from 'mongoose'

import config from '../../config.js'
import { ShortUrl } from './shortUrl.model.js'

export const shortUrlRouter = Router()

const SHORT_URL_LENGTH = 10
const SHORT_URL_HALF_LENGTH = Math.floor(SHORT_URL_LENGTH / 2)

shortUrlRouter.route('/').post((req, res) => {
  let { url } = req.body
  const id = mongoose.Types.ObjectId()
  const urlDigest = hash(url + id)
  const headersDigest = hash(JSON.stringify(req.headers) + id)

  const hashed =
    urlDigest.substring(0, SHORT_URL_HALF_LENGTH) +
    headersDigest.substring(0, SHORT_URL_HALF_LENGTH)

  const shortUrl = config.host + '/shorturl/' + hashed

  if (!url.includes('http')) {
    url = `http://${url}`
  }

  ShortUrl.create({
    _id: id,
    hash: hashed,
    originalUrl: url,
  })

  res.status(200).json({ shortUrl, originalUrl: url })
})

shortUrlRouter.route('/:hash').get(async (req, res) => {
  const doc = await ShortUrl.findOne({ hash: req.params.hash })

  if (doc) {
    res.redirect(doc.originalUrl)
  } else {
    res.status(404).end()
  }
})

function hash(string) {
  return createHash('shake256').update(string).digest('base64')
}
