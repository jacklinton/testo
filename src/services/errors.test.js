/**
 * @group unit
 */
import createErrorMessage from './errors'

describe('Error module unit tests', () => {
  test('Should return an object with one property called error and a string input for the value of the property', () => {
    const theError = createErrorMessage('An error occurred!')
    expect(theError).toBeInstanceOf(Object)
    expect(theError).toHaveProperty('error')
    expect(theError).toStrictEqual({ error: 'An error occurred!' })
  })
})
