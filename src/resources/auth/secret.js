import parseJwk from 'jose/jwk/parse'

export const privateKey = await parseJwk({
  alg: 'ES256',
  crv: 'P-256',
  kty: 'EC',
  d: 'VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4',
  x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
  y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo',
})

export const publicKey = await parseJwk({
  alg: 'ES256',
  crv: 'P-256',
  kty: 'EC',
  x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
  y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo',
})

export const secret = Uint8Array.from([
  206,
  203,
  53,
  165,
  235,
  214,
  153,
  188,
  248,
  225,
  1,
  132,
  105,
  204,
  75,
  42,
  186,
  185,
  24,
  223,
  136,
  66,
  116,
  59,
  183,
  135,
  52,
  52,
  131,
  167,
  201,
  55,
])
