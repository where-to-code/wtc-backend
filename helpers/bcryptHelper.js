const bcrypt = require('bcryptjs');

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  return hashed;
};

const comparePassword = (password, hashPass) =>
  bcrypt.compareSync(password, hashPass);

module.exports = { hashPassword, comparePassword };
