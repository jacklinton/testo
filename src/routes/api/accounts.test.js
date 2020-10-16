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

describe('GET accounts route suite', () => {
  test('expect redirect when GET is called on route without session vars', () => {
    const res = mockResponse()
    getRecords(req, res)
    expect(res.redirect).toHaveBeenCalled()
  })
})
