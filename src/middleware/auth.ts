import { Request, Response, NextFunction } from 'express';
import { verifyJwt, JwtPayload } from '../shared/utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const token = header.slice(7);
  try {
    const payload = verifyJwt(token);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

