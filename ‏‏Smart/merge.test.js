const request = require('supertest');
const app = require('./smartApp'); 

describe('API Endpoint', () => {
  it('should merge data', async () => {
    const response = await request(app)
      .post('/mergeDataTest')
      .send( [
        {
          sourceData: "webint",
          data: {
            tz: "112",
            name: "Moshe",
            age: 60
        }
        },
        {
          sourceData: "c2",
          data: {
            tz: 323,
            name: "M",
            age: 50
          }
        }
            ]);
    console.log('Response Body:', response.body);

    expect(response.body).toEqual({
      age: 50,
      name: "Moshe",
      tz: "112"
  });
  });
});
