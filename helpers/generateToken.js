
const jwt = require('jsonwebtoken');

module.exports = (res, id, firstname) => {
  const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET);
  return res.cookie('token', token, {
    expires: new Date(Date.now() + 604800000),
    secure: false,
    httpOnly: true,
  });
};
