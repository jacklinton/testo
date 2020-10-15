/**
 * @group integration
 */
import request from 'supertest'
import app from '../src/server'

describe('API route test for /version', () => {
  it('should return an object with the version', () => {
    return request(app)
      .get('/version')
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('version')
      })
  })
})
