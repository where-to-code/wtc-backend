const supertest = require('supertest');
const app = require('../api/server');

describe('POST /api/auth/register', () => {
  const user1 = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@me.com',
    password: '12345678j',
  };
  const user2 = {
    firstname: '',
    lastname: 'cea',
    email: 'johndoe@me.com',
  };
  const user3 = {
    firstname: 'basil',
    lastname: 'cea',
    email: 'johndoe',
    password: '123456',
  };
  it('should fail if any field is empty ', async () => {
    const response = await supertest(app)
      .post('/api/auth/register')
      .send(user2);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toMatchObject({
      message: ['firstname cannot be empty', 'password field is required'],
      status: 400,
    });
  });
  it('should fail if password is empty or email is empty', async () => {
    const response = await supertest(app)
      .post('/api/auth/register')
      .send({
        firstname: 'basil',
        lastname: 'cea',
        email: '',
        password: '',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toMatchObject({
      message: [
        'Email cannot be empty',
        'Incorrect email format. e.g eaxmple@mymail.com',
        'password cannot be empty',
        'Password must be beween 6 and 15 ' +
          'characters and contain letters and ' +
          'numbers ',
      ],
      status: 400,
    });
  });
});
