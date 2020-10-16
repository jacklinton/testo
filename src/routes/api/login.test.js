/**
 * @group unit
 */
import { redirectToLogin } from './login'

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.redirect = jest.fn().mockReturnValue(res)
  return res
}

const req = {}

describe('GET login route suite', () => {
  test('expect response when GET is called on route', () => {
    const res = mockResponse()
    redirectToLogin(req, res)
    expect(res.redirect).toHaveBeenCalled()
  })
})
