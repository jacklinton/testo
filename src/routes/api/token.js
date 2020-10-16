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
  console.log(code)
  console.log(oauth2)

  conn.authorize(code, function(err, userInfo) {
    if (err) {
      logger.error(`There was an error in the auth callback: ${err}`)
    }

    console.log('Access Token: ' + conn.accessToken)
    console.log('Instance URL: ' + conn.instanceUrl)
    console.log('refreshToken: ' + conn.refreshToken)
    console.log('User ID: ' + userInfo.id)
    console.log('Org ID: ' + userInfo.organizationId)

    req.session.accessToken = conn.accessToken
    req.session.instanceUrl = conn.instanceUrl
    req.session.refreshToken = conn.refreshToken

    const bool = encodeURIComponent('true')

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
