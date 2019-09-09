const request = require('supertest');
const server = require('../api/server');

describe('/locations [GET]', () => {
  const queryParameter = {
    lat: '7.5663896',
    long: '3.3662124',
    range: '0.135',
  };

  const queryParameter2 = {
    lat: '-34.58',
    long: '-58.44',
    range: '0.135',
  };

  it('should fail if no latitude and longitude is not given', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query()
      .expect('Content-Type', /json/);

    expect(res.status).toEqual(400);
  });

  it('should fail if either longitude is not given', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query({ lat: '-34.58', long: '', range: '0.135' })
      .expect('Content-Type', /json/);

    expect(res.status).toEqual(400);
  });
  it('should fail if either latitude is not given', async () => {
    const res = await request(server)
      .get('/api/locations')
      .query({ lat: '', long: '58.9', range: '0.135' })
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
  it('Return the object that matches the id provided', async () => {
    const res = await request(server)
      .get('/api/locations/1')
      .expect('Content-Type', /json/);
    expect(res.body.data.id).toEqual(1);
  });

  it('Returns a 404 if no location matches the id', async () => {
    const res = await request(server)
      .get('/api/locations/0')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(404);
  });

  it('Returns a 404 if 400 if a string is entered as query param', async () => {
    const res = await request(server)
      .get('/api/locations/happy')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
  });
});

describe('test suite for POST/ locations', () => {
  const location = {
    name: 'Somewhere on Earth',
    description: '127.0.0.1 localhost',
    image_url: 'www.badass?.com',
    address: 'Epic Tower on Mars',
    longitude: '24.1',
    latitude: '34.6',
  };
  it('should fail if no name', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ name: '' });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'name must be a string',
      ],
    });
  });
  it('should fail if description format is wrong', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ description: '' });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'description must be a string',
      ],
    });
  });
  it('should fail if image_url does not exist', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ image_url: '' });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'image_url must be a string',
      ],
    });
  });
  it('should fail if address is no empty', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ address: '' });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'address must be a string',
      ],
    });
  });
  it('should fail if longitude is no empty', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ longitude: '' });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Long field is required',
      ],
    });
  });
  it('should fail if latitude is no empty', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ latitude: '' });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Lat field is required',
      ],
    });
  });
  it('should return an object with valid inputs', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send(location)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(201);
  });
});
