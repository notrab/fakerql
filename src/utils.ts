import * as jwt from 'jsonwebtoken';

export const generateAuthToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, {
    expiresIn
  });

export const getUserId = ctx => {
  const Authorization = ctx.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }

  throw new Error('Not Authorized');
};
