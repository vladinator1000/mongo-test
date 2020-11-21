import { Router } from 'express'
import bcrypt from 'bcrypt'

import { UserModel } from './user.model.js'
import { verifyToken, makeToken } from './jwt.js'

export const authRouter = Router()

export const authorization = async (req, res, next) => {
  try {
    req.context = await verifyToken(req.headers.authorization)
    next()
  } catch (error) {
    res.status(401).json({ error: error.toString() })
  }
}

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: { code: 'EMAIL_NOT_FOUND' } })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ error: { code: 'INVALID_PASSWORD' } })
    }

    const token = await makeToken(user)

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

authRouter.post('/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (user) {
      return res.status(400).json({ error: { code: 'EMAIL_ALREADY_EXISTS' } })
    }

    const token = await makeToken(email)

    // Send email
    console.log('Registration successful ', token)

    await new UserModel({
      email,
      password: await bcrypt.hash(password, 10),
      token: await bcrypt.hash(token, 10),
    }).save()

    return res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

authRouter.get('/verifyEmail/:token', async (req, res) => {
  const { token } = req.params

  try {
    const verificationResult = await verifyToken(token)

    if (verificationResult) {
      const { email } = verificationResult.user
      const user = await UserModel.findOne({ email, isEmailVerified: false })

      if (!user) {
        return res.status(400).json({ error: { code: 'USER_NOT_FOUND' } })
      }

      const doTokensMatch = await bcrypt.compare(token, user.token)

      if (doTokensMatch) {
        const newToken = await makeToken(user)
        await user.update({ isEmailVerified: true, token: newToken })

        return res.json({ token: newToken })
      } else {
        return res.status(400).json({ code: 'INVALID_TOKEN' })
      }
    } else {
      return res.status(400).json({ code: 'INVALID_TOKEN' })
    }
  } catch (error) {
    res.status(400).json({ error: error.toString() })
  }
})
