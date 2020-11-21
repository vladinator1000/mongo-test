import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
  email: String,
  isEmailVerified: { type: Boolean, default: false },
  password: String,
  token: String,
})

export const UserModel = model('user', userSchema)
