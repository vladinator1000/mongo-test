import mongoose from 'mongoose'

const { Schema, model } = mongoose

const shortUrlSchema = new Schema({
  hash: String,
  originalUrl: String,
})

export const ShortUrl = model('ShortUrl', shortUrlSchema)
