var bcrypt = require("bcryptjs");

function encrypt(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

function decrypt(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { encrypt, decrypt };
