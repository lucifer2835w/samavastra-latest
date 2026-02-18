import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verifyJwt } from '../shared/utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}



export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
      const user = verifyJwt(token);
      req.user = user;
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error);
      res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(401); // Unauthorized
  }
}
