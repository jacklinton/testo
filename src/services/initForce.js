import jsforce from 'jsforce'
import logger from '@apis/node-logger'

const loginUrl = process.env.LOGIN_URL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI

if (!loginUrl || !clientId || !clientSecret || !redirectUri) {
  const err = new Error(`One or more environment variables for OAuth is not defined.
    Check settings and add all necessary values to continue using the app.`)
  logger.error(err)
  process.abort()
}

export const oauth2 = new jsforce.OAuth2({
  loginUrl,
  clientId,
  clientSecret,
  redirectUri,
})
