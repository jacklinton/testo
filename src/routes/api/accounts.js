/**
 * @route accounts
 * @description This route will display account info
 */
import logger from '@apis/node-logger'
import {
  sessionConnectObj,
  paginate,
  decorateResults,
} from '../../services/utils'

export function createBaseQuery(req) {
  const conn = sessionConnectObj(req)
  return conn
    .sobject('Account')
    .select([
      'Id',
      'Name',
      'BillingCity',
      'BillingCountry',
      'Phone',
      'Website',
      'AnnualRevenue',
    ])
}

async function getRecords(req, res) {
  if (!req.session.accessToken || !req.session.instanceUrl) {
    logger.info('Attempt to access data without authorization')
    return res.redirect('/version')
  }
  let result
  const pageSize = req.query.pageSize || 10
  const pageNum = req.query.pageNum || 1

  try {
    const baseQuery = createBaseQuery(req)

    const paginatedQuery = await paginate(baseQuery, pageSize, pageNum)

    result = decorateResults(paginatedQuery, pageSize, pageNum)
  } catch (e) {
    logger.error(e)
    return res
      .status(404)
      .json({ error: 'No records found with search parameters' })
  }
  return res.json(result)
}

export default [['GET /accounts', getRecords]]

/**
 * @swagger
 *      /accounts:
 *         get:
 *           description: Retrieves account info
 */
