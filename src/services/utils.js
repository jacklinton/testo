import jsforce from 'jsforce'
import { oauth2 } from './initForce'

/**
 * create new connection to Salesforce API with session
 * @param req
 * @returns {jsforce.Connection}
 */
export function sessionConnectObj(req) {
  return new jsforce.Connection({
    oauth2: { oauth2 },
    accessToken: req.session.accessToken,
    instanceUrl: req.session.instanceUrl,
  })
}

/**
 * create new connection to Salesforce API without session
 * @returns {jsforce.Connection}
 */
export function newConnectObj() {
  return new jsforce.Connection({ oauth2 })
}

/**
 * apply limit and offset to query
 * @param query
 * @param pageSize
 * @param pageNum
 * @returns {*}
 */
export function paginate(query, pageSize, pageNum) {
  if (!pageSize) {
    return query
  }

  return query.limit(pageSize).offset(pageSize * (pageNum - 1))
}

export function decorateResults(results, pageSize, pageNum) {
  return {
    pageSize,
    pageNum,
    results,
  }
}
