const bcrypt = require('bcryptjs');

const hashPassword = async password => {
  const salt = await bcrypt.genSaltSync(10);
  const hashed = await bcrypt.hashSync(password, salt);
  return hashed;
};

const comparePassword = async (password, hashPass) => {
  return bcrypt.compareSync(password, hashPass);
};

module.exports = { hashPassword, comparePassword };
