const jwt = require('jsonwebtoken');

exports.generateAuthToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, {
    expiresIn
  });
