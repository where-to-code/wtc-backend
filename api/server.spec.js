const request = require('supertest');
const server = require('./server');

describe('/ [GET]', () => {
  it('returns a 200', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
      done
  });

  it('returns a message', (done) =>
    request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          'The Where-to-Code Server is up!',
        );
        done()
      }));

  it('catches and handles bad request', (done) =>
    request(server)
      .get('/very-inappropriate-url')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(res => {
        expect(res.body.message).toEqual('No endpoint matches that URL.');
        done()
      }));
});
