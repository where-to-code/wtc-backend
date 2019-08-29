const cookie = require('cookie');
const jwt = require('jsonwebtoken');

module.exports = (res, id, firstname) => {
  const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET);
  return res.setHeader('Set-Cookie', cookie.serialize('token', token), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    secure: false,
  });
};
