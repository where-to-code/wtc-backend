const request = require('supertest');
const server = require('../api/server');

describe('/locations/:id/review [POST]', () => {
  const review = {
    quietness: 2,
    wifi_speed: 3,
    community: 4,
    accessibility: 5,
    description: 'Place was great',
    user_id: 5
  };
  it('should fail if required fields are not given', async () => {
    const res = await request(server)
      .post('/api/locations/5/review')
      .send({});
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Quietness field is required',
        'Wifi field is required',
        'Community field is required',
        'Accessibility field is required',
        'Description must be a string',
        'User ID field is required'
      ]
    });
  });

  it('should return an error if location id is not available', async () => {
    const res = await request(server)
      .post('/api/locations/30000/review')
      .send(review)
      .expect('Content-Type', /json/);
    expect(res.body).toEqual({
      status: 404,
      message: 'This location does not exist'
    });
  });
  it('should fail if network error', async () => {
    const reviewErr = {
      quietness: 2,
      wifi_speed: 3,
      community: 4,
      accessibility: 5,
      description: 'Place was great',
      user_id: 50000
    };
    try {
      await request(server)
        .post('/api/locations/1/review')
        .send(reviewErr);
    } catch (error) {
      expect(error.status).toEqual(500);
    }
  });

  it('should return an object with valid inputs', async () => {
    const res = await request(server)
      .post('/api/locations/300/review')
      .send(review)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(201);
  });

  it('should return an error if user tries to review the same location twice', async () => {
    const res = await request(server)
      .post('/api/locations/300/review')
      .send(review)
      .expect('Content-Type', /json/);
    expect(res.body).toEqual({
      status: 500,
      error: 'You have already reviewed this location.'
    });
  });
});
