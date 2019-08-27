const statusHandler = require('../helpers/statusHandler');
const bcryptHelper = require('../helpers/bcryptHelper');

const registerNewUser = async (req, res) => {
  const {
    firstname, lastname, email, password: pwd,
  } = req.body;
  const password = bcryptHelper(pwd);
  const user = {
    firstname, lastname, email, password,
  };
  try {
    const newUser = await module.registerUser(user);
    return statusHandler(res, 200, newUser);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};


module.exports = { registerNewUser };
