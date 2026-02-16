import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { env } from '../../config/env';

export interface JwtPayload {
  id: string;
  roles: string[];
}

export function signJwt(payload: JwtPayload, expiresIn: number | string = '1h'): string {
  const options: SignOptions = { expiresIn: expiresIn as any };
  const secret: Secret = env.jwtSecret;
  return jwt.sign(payload, secret, options);
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}

