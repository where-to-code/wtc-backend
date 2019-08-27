const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = await bcrypt.hashSync(password, salt);
  return hashed;
};
module.exports = { hashPassword };
