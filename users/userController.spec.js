const supertest = require('supertest');
const app = require('../api/server');

describe('POST /api/auth/register', () => {
  const user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@me.com',
    password: '12345678',
  };
  it('should create a new user', async () => {
    const response = await supertest(app)
      .post('/api/auth/register')
      .send(user)
    expect(response.statusCode).toEqual(201);
    expect(response).toHaveProperty('user');
  });
});
