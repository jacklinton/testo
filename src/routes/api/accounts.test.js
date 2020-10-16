/**
 * @group unit
 */
import { getRecords } from './accounts'

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.redirect = jest.fn().mockReturnValue(res)
  return res
}

const req = {
  session: {
    accessToken: undefined,
    instanceUrl: undefined,
  },
  query: {
    pageSize: undefined,
    pageNum: undefined,
  },
}

function createBaseQuery() {
  return {
    limit: jest.fn().mockReturnValue(
      Promise.resolve({
        offset: jest.fn().mockReturnValue(Promise.resolve({})),
      })
    ),
  }
}

describe('GET accounts route suite', () => {
  test('expect redirect when GET is called on route without session vars', () => {
    const res = mockResponse()
    getRecords(req, res, createBaseQuery)
    expect(res.redirect).toHaveBeenCalled()
  })
  test('expect response when GET is called on route with invalid session vars', () => {
    const res = mockResponse()
    req.session.accessToken = 'token'
    req.session.instanceUrl = 'https://localhost:8443/version'
    getRecords(req, res, createBaseQuery)
    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(404)
  })
})
