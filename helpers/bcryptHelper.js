const bcrypt = require('bcrypt');

exports.hashSync = password => bcrypt.hashSync(password, 10);
