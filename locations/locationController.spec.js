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

// add locations

describe('POST/ add locations', () => {
  let cookie;
  const location = {
    name: 'Somewhere on Earth',
    description: '127.0.0.1 localhost',
    image_url: 'www.badass?.com',
    address: 'Epic Tower on Mars',
    longitude: '24.1',
    latitude: '34.6',
    place_id: '',
  };
  beforeAll(async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        firstname: 'john',
        lastname: 'jane',
        email: 'aabjane@g.com',
        password: '123456abc',
      });
    cookie = res.headers['set-cookie'];
  });
  it('should fail if name is empty', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ name: '' })
      .set('Cookie', cookie);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Lat field is required',
        'Long field is required',
        'name must be a string',
        'description must be a string',
        'image_url must be a string',
        'address must be a string',
        'place_id is required',
      ],
    });
  });
  it('should fail if description format is wrong', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ description: '' })
      .set('Cookie', cookie);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Lat field is required',
        'Long field is required',
        'name must be a string',
        'description must be a string',
        'image_url must be a string',
        'address must be a string',
        'place_id is required',
      ],
    });
  });
  it('should fail if image_url does not exist', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ image_url: '' })
      .set('Cookie', cookie);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Lat field is required',
        'Long field is required',
        'name must be a string',
        'description must be a string',
        'image_url must be a string',
        'address must be a string',
        'place_id is required',
      ],
    });
  });
  it('should fail if address is no empty', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ address: '' })
      .set('Cookie', cookie);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Lat field is required',
        'Long field is required',
        'name must be a string',
        'description must be a string',
        'image_url must be a string',
        'address must be a string',
        'place_id is required',
      ],
    });
  });
  it('should fail if longitude is no empty', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ longitude: '' })
      .set('Cookie', cookie);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Lat field is required',
        'Longitude cannot be empty',
        'Longitude must be a number',
        'name must be a string',
        'description must be a string',
        'image_url must be a string',
        'address must be a string',
        'place_id is required',
      ],
    });
  });
  it('should fail if latitude is no empty', async () => {
    const res = await request(server)
      .post('/api/locations')
      .send({ latitude: '' })
      .set('Cookie', cookie);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Latitude cannot be empty',
        'Latitude must be a number',
        'Long field is required',
        'name must be a string',
        'description must be a string',
        'image_url must be a string',
        'address must be a string',
        'place_id is required',
      ],
    });
  });
});

describe('/locations/:id [PUT] update a locations decription', () => {
  const description = {
    description: 'This is an awesome place to code. Believe me',
  };

  it('should change the description of a location', async () => {
    const res = await request(server)
      .put('/api/locations/1')
      .send(description);

    expect(res.status).toEqual(200);
    expect(res.body.data[0].description).toEqual(
      'This is an awesome place to code. Believe me',
    );
  });

  it('Return a 404 if location does not exist', async () => {
    const res = await request(server)
      .put('/api/locations/-1')
      .send(description);

    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual('This location does not exist');
  });

  it('Validates req body for description field', async () => {
    const res = await request(server)
      .put('/api/locations/1')
      .send({});

    expect(res.status).toEqual(400);
  });
});
