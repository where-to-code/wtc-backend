const emailExists = require('../helpers/emailChecker');

describe('it check if email exists', () => {
  it('should return user if email exist', async () => {
    const value = await emailExists('jh@john.com');
    expect(value).toHaveProperty('firstname', 'lastname', 'email', 'password');
  });

  it('should return undefined if email does not exist', async () => {
    const value = await emailExists('basil@john.com');
    expect(value).toBeUndefined();
  });
});
