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
  it('should fail if no latitude and longitude is not given', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query()
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
  });
  it('should fail if either latitude or longitude is not given', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query({ lat: '-34.58', long: '' })
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
  });
  it('should fail if latitude or longitude is empty', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query({ lat: '', long: '' })
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual([
      'Latitude cannot be empty',
      'Latitude must be a number',
      'Longitude cannot be empty',
      'Longitude must be a number',
    ]);
  });
  it('should fail if latitude is not a number', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query({ lat: 'abc', long: -34.56 })
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(['Latitude must be a number']);
  });
  it('should fail if longitude is not a number', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query({ lat: '12.4', long: 'abs' })
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(['Longitude must be a number']);
  });
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
});
