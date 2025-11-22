import jwt, { SignOptions } from 'jsonwebtoken';

export const createAccessToken = (
  jwtPayload: { email: string; role?: string, id: string, phone?: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};

export const createRefreshToken = (
  jwtPayload: { email: string; role?: string, id: string, phone?: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};
