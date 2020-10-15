import config from 'config'
import https from 'https'
import fs from 'fs'
import logger from '@apis/node-logger'
import app from './server.js'

const sslConfig = config.get('ssl')
const privateKey = fs.readFileSync(sslConfig.key, 'utf8')
const certificate = fs.readFileSync(sslConfig.cert, 'utf8')
const port = config.get('server').port || 8443

https
  .createServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app
  )
  .listen(port, () => {
    logger.info(`${process.env.APP_NAME} is listening on https port ${port}`)
  })
