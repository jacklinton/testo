/**
 * @group unit
 */
import { acceptTokenCode } from './token'

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.redirect = jest.fn().mockReturnValue(res)
  return res
}

const req = {
  query: {
    code: undefined,
  },
}

describe('GET token route suite', () => {
  test('expect token route handler to fail when code is missing', () => {
    const res = mockResponse()
    acceptTokenCode(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalled()
  })
  test('expect res to have been called if code exists', async () => {
    const res = mockResponse()
    req.query.code = 'code'
    await acceptTokenCode(req, res).catch(err => err)
    expect(res.json).toHaveBeenCalled()
  })
})
