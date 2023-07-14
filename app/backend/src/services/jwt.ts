import { JwtPayload, sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export type Payload = {
  id: number,
  email: string,
  password: string,
};

const signJwt = (payload: Payload): JwtPayload | string => sign(payload, secret);

const verifyJwt = (token: string): JwtPayload | string => verify(token, secret);

export {
  signJwt,
  verifyJwt,
};
