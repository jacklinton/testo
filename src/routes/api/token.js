/**
 * @route token
 * @description This route is the callback url to receive the token code.
 */
import logger from '@apis/node-logger'
import { newConnectObj } from '../../services/utils'

export const acceptTokenCode = (req, res) => {
  const conn = newConnectObj()
  const { code } = req.query

  if (!code) {
    logger.error(
      'There was a problem with the oauth redirect. Authorization code missing.'
    )
    return res
      .status(500)
      .json({ error: 'Unknown server error. Please contact system admin.' })
  }

  return conn.authorize(code, err => {
    if (err) {
      logger.error(`There was an error in the auth callback: ${err}`)
      return res
        .status(500)
        .json({ error: 'Unknown server error. Please contact system admin.' })
    }

    req.session.accessToken = conn.accessToken
    req.session.instanceUrl = conn.instanceUrl
    req.session.refreshToken = conn.refreshToken

    return res.redirect(
      `${process.env.APP_URL || 'https://localhost:8443'}/accounts`
    )
  })
}

export default [['GET /token', acceptTokenCode]]

/**
 * @swagger
 *      /token:
 *         get:
 *           description: Callback route for oauth token code
 */
