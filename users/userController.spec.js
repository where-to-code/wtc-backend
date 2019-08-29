const request = require('supertest');
const server = require('../api/server');

describe('/auth/register [POST]', () => {
  it('should fail if required fields are not given', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({});
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      message: [
        'firstname field is required',
        'lastname field is required',
        'Email field is required',
        'password field is required',
      ],
      status: 400,
    });
  });
  it('should fail if first name or last name is empty', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        firstname: '',
        lastname: '',
        email: 'jbd@m.com',
        password: '123abc',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: ['firstname cannot be empty', 'lastname cannot be empty'],
    });
  });
  it('should fail if first name or last name is not a string', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        firstname: 1,
        lastname: 2,
        email: 'jbd@m.com',
        password: '123abc',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: ['firstname must be a string', 'lastname must be a string'],
    });
  });
  it('should fail if email or password is empty', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        firstname: 'jjj',
        lastname: 'jbd',
        email: '',
        password: '',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Email cannot be empty',
        'Incorrect email format. e.g eaxmple@mymail.com',
        'password cannot be empty',
        'Password must be beween 6 and 15 ' +
          'characters and contain letters and ' +
          'numbers ',
      ],
    });
  });
  it('should fail if email or password has wrong format', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        firstname: 'jjj',
        lastname: 'jbd',
        email: 'jbdg',
        password: '123',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: [
        'Incorrect email format. e.g eaxmple@mymail.com',
        'Password must be beween 6 and 15 ' +
          'characters and contain letters and ' +
          'numbers ',
      ],
    });
  });
  it('should fail if email already exists', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        firstname: 'jjj',
        lastname: 'jbd',
        email: 'jn@john.com',
        password: '123abc',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: 'Email already exists',
    });
  });
  it('should pass', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        firstname: 'jjj',
        lastname: 'jbd',
        email: 'jnb@john.com',
        password: '123abc',
      });
    expect(res.status).toEqual(201);
    expect(res.body.data).toHaveProperty('firstname', 'jjj');
    expect(res.body.data).toHaveProperty('lastname', 'jbd');
    expect(res.body.data).toHaveProperty('email', 'jnb@john.com');
  });
});

describe('/auth/login [POST]', () => {
  beforeAll(async () => {
    await request(server)
      .post('/api/auth/register')
      .send({
        firstname: 'john',
        lastname: 'jane',
        email: 'aabjane@g.com',
        password: '123456abc',
      });
  });
  it('should fail if email does not exist', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'jjj@n.com',
        password: '12345abcj',
      });
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({
      status: 404,
      message: 'Email does not exist',
    });
  });
  it('should fail if password is not correct', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'jn@john.com',
        password: '12345abcj',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      status: 400,
      message: 'Password Mismatch',
    });
  });
  it('should pass', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'aabjane@g.com',
        password: '123456abc',
      });
    expect(res.status).toEqual(200);
  });
});