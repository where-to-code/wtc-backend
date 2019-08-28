const bcrypt = require('../helpers/bcryptHelper');

describe('it should hash password', () => {
  it('should hash a password', async () => {
    const value = await bcrypt.hashPassword('1234567b');
    expect(bcrypt.comparePassword('1234567b', value)).toBeTruthy();
  });
});
