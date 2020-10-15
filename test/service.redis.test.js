/**
 * @group integration
 */
import config from 'config'
import { setAsync, getAsync, endConnection } from '@apis/request-cache'

const redisConfig = config.get('redis')
const { prefix, defaultUnit, defaultDuration } = redisConfig

afterAll(() => endConnection())

describe('test each exported function of the redis module', () => {
  it('the setAsync function should return OK if the conditions are met', async () => {
    await expect(
      setAsync(
        `${prefix}:theAwesomeKey`,
        JSON.stringify('The awesome value!'),
        defaultUnit,
        defaultDuration
      )
    ).resolves.toStrictEqual('OK')
  })
  it('the getAsync function should resolve to a string', async () => {
    await expect(getAsync(`${prefix}:theAwesomeKey`)).resolves.toStrictEqual(
      JSON.stringify('The awesome value!')
    )
  })
})
