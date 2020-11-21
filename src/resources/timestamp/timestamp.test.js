import request from 'supertest'
import testHelper from '../../testHelper'

describe('timestamp', () => {
  const expectedResult = {
    unix: 1451001600000,
    utc: 'Fri, 25 Dec 2015 00:00:00 GMT',
  }

  test('GET with the YYYY-MM-DD format', async () => {
    await testHelper.get('/timestamp/2015-12-25').expect(200, expectedResult)
  })

  test('GET with the UNIX format', async () => {
    await testHelper.get('/timestamp/1451001600000').expect(200, expectedResult)
  })
})
