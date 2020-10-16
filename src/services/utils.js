import jsforce from 'jsforce'
import { oauth2 } from './initForce'

export function sessionConnectObj(req) {
  return new jsforce.Connection({
    oauth2: { oauth2 },
    accessToken: req.session.accessToken,
    instanceUrl: req.session.instanceUrl,
  })
}

export function newConnectObj(req) {
  return new jsforce.Connection({ oauth2 })
}

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
