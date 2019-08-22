const request = require('supertest');
const server = require('./server');

describe('/ [GET]', () => {
  it('returns a 200', () => {
    return request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });

  it('returns a message', () => {
    return request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('The Where-to-Code Server is up!');
      });
  });
  it('catches and handles bad request', () => {
    return request(server)
      .get('/very-inappropriate-url')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('No endpoint matches that URL.');
      });
  });
});
