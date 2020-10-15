/**
 * @route version-route
 * @description This route is used for confirmation that the application server is up, running,
 * and functioning properly.
 */
import p from '../../../package.json'

const { version } = p
export const getVersion = (req, res) => res.status(200).json({ version })

// has to be an array of arrays and always the default export
export default [['GET /version', getVersion]]

/**
 * @swagger
 *      /version:
 *         get:
 *           description: Returns the version of the app as an object
 *           produces:
 *            - application/json
 *           responses:
 *            200:
 *              description: version
 */
