import jwtVerify from 'jose/jwt/verify'
import SignJWT from 'jose/jwt/sign'

import { privateKey, publicKey } from './secret.js'

export const verifyToken = async (token) => {
  const { payload, protectedHeader } = await jwtVerify(token, publicKey, {
    issuer,
    audience,
  })

  return { user: payload.user }
}

export const makeToken = async (user) => {
  delete user.password
  delete user.isEmailVerified

  return new SignJWT({ user })
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('24h')
    .sign(privateKey)
}

const issuer = 'urn:example:issuer'
const audience = 'urn:example:audience'
