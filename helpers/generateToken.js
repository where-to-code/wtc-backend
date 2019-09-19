const jwt = require('jsonwebtoken');

module.exports = (res, id, firstname) => {
  const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
  const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET, {
  });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration),
    secure: false,
    httpOnly: true,
  });
};
