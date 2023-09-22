const jwt = require("jsonwebtoken");

// generate access or refresh token
const generateToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

module.exports = generateToken;
