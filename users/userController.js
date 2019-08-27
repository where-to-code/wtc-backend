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
    await Model.registerUser(user);
    return statusHandler(res, 200, user);
  } catch (err) {
    console.log(err);
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = { register };
