/**
 * @route token
 * @description This route is the callback url to receive the token code.
 */
import jsforce from 'jsforce'
import logger from '@apis/node-logger'
import { oauth2 } from '../../services/initForce'

export const acceptTokenCode = (req, res) => {
  const conn = new jsforce.Connection({ oauth2: oauth2 })
  const code = req.query.code

  return conn.authorize(code, (err) => {
    if (err) {
      logger.error(`There was an error in the auth callback: ${err}`)
    }

    req.session.accessToken = conn.accessToken
    req.session.instanceUrl = conn.instanceUrl
    req.session.refreshToken = conn.refreshToken

    res.redirect('https://localhost:8443/accounts')
  })
}

export default [['GET /token', acceptTokenCode]]

/**
 * @swagger
 *      /token:
 *         get:
 *           description: Callback route for oauth token code
 */
