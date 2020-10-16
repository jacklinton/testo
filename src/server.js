import path from 'path'
import config from 'config'
import express from 'express'
import BodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import expressWinston from 'express-winston'
import setRequestIdHeader from '@apis/request-id'

import logger from '@apis/node-logger'
import routes from './routes/index.js'

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve()

const app = express()

// Init session
app.use(session({ secret: 'S3CRE7', resave: true, saveUninitialized: true }))

app.use(cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

// serve docs as status asset
app.use(express.static(path.resolve(__dirname, '../public')))

// log routes
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}}',
  })
)

// TODO: Utilize UUID in request logs
app.use(setRequestIdHeader)

/**
 * Recursively include all routes
 */

routes(app)

app.use(
  /**
   * Handles uncaught errors
   * @param {Error} err
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {function} next
   * @returns {Response|*}
   */
  (err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    logger.error(err)
    return res.status(500).send({ error: config.get('errors').uncaught })
  }
)

export default app
