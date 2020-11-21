import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
  email: String,
  isEmailVerified: Boolean,
  password: String,
  token: String,
})

export const UserModel = model('user', userSchema)
