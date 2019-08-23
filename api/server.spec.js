const request = require('supertest');
const server = require('./server');

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe('/ [GET]', () => {
  it('returns a 200', () => {
    return request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });

  it('returns a message', done => {
    return request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('The Where-to-Code Server is up!');
        done();
      });
  });

  it('catches and handles bad request', () => {
    return request(server)
      .get('/very-inappropriate-url')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('No endpoint matches that URL.');
      });
  });
});
