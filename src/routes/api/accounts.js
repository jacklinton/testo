/**
 * @route accounts
 * @description This route will display account info
 */
import jsforce from 'jsforce'
import logger from '@apis/node-logger'
import { oauth2 } from '../../services/initForce'

export const getRecords = (req, res) => {
  if (!req.session.accessToken || !req.session.instanceUrl) {
    res.redirect('/version')
  }

  let q = `SELECT id, name FROM account LIMIT 10`

  let conn = new jsforce.Connection({
    oauth2: { oauth2 },
    accessToken: req.session.accessToken,
    instanceUrl: req.session.instanceUrl,
  })

  let records = []
  let query = conn
    .query(q)
    .on('record', function(record) {
      records.push(record)
    })
    .on('end', function() {
      console.log('total in database : ' + query.totalSize)
      console.log('total fetched : ' + query.totalFetched)
      res.json(records)
    })
    .on('error', function(err) {
      console.error(err)
    })
    .run({ autoFetch: true, maxFetch: 4000 })
  // return query
}

export default [['GET /accounts', getRecords]]

/**
 * @swagger
 *      /accounts:
 *         get:
 *           description: Retrieves account info
 */
