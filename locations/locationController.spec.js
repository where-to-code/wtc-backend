const request = require('supertest');
const server = require('../api/server');

describe('/locations [GET]', () => {
  const queryParameter = {
    lat: '7.5663896',
    long: '3.3662124',
  };
  const queryParameter2 = {
    lat: '-34.58',
    long: '-58.44',
  };
  it('should fail if no location around user', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query(queryParameter)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(404);
  });
  it('should pass if locations exists around user', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query(queryParameter2)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
  });
  it('should fail if network error', async () => {
    try {
      await request(server).get('/api/locations');
    } catch (error) {
      expect(error).toMatch('Something went wrong');
    }
  });
});
