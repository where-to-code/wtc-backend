const Model = require('./userModel');
const statusHandler = require('../helpers/statusHandler');
const { hashPassword } = require('../helpers/bcryptHelper');

const register = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const password = await hashPassword(req.body.password);
    const user = {
      firstname, lastname, email, password,
    };
    const newUser = await Model.registerUser(user);
    if (newUser.rowCount === 1) {
      return statusHandler(res, 201, user);
    }
    return statusHandler(res, 201, { message: 'user could not created' });
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = { register };
