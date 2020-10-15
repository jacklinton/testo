/**
 * @group unit
 */
import { getVersion } from './version'
import p from '../../../package.json'

const { version } = p

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

const req = {}

describe('GET version route suite', () => {
  test('expect version to be properly imported from package.json', () => {
    expect(version).toEqual(p.version)
  })
  test('should 200 with JSON object with version key and value', () => {
    const res = mockResponse()
    getVersion(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ version })
  })
})
