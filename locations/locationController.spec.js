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

describe('/locations/:id [GET]', () => {
  it('Return the object that matches the id provided', () =>
    request(server)
      .get('/api/locations/1')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.data.id).toEqual(1);
      }));

  it('Returns a 404 if no location matches the id', () =>
    request(server)
      .get('/api/locations/0')
      .expect('Content-Type', /json/)
      .expect(404));

  it('Returns a 404 if 400 if a string is entered as query param', () =>
    request(server)
      .get('/api/locations/happy')
      .expect('Content-Type', /json/)
      .expect(400));
});
