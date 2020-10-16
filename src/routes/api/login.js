/**
 * @route login
 * @description This route will handle redirecting a user to the salesforce login page.
 */
import { oauth2 } from '../../services/initForce'

export const redirectToLogin = (req, res) => res.redirect(oauth2.getAuthorizationUrl({scope: 'api id web refresh_token'}))

export default [['GET /auth/login', redirectToLogin]]

/**
 * @swagger
 *      /auth/login:
 *         get:
 *           description: Redirect to salesforce login
 */
