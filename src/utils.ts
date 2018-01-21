import * as jwt from 'jsonwebtoken';

export const generateAuthToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, {
    expiresIn
  });
