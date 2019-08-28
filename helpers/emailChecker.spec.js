const emailExists = require('../helpers/emailChecker');
const bcrypt = require('../helpers/bcryptHelper');

describe('it check if email exists', () => {
  it('should return user if email exist', async () => {
    const value = await emailExists('jh@john.com');
    expect(value).toMatchObject({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'jh@john.com',
      password: bcrypt.hashPassword('12345'),
    });
  });
  it('should return undefined if email does not exist', async () => {
    const value = await emailExists('basil@john.com');
    expect(value).toBeUndefined();
  });
});
