import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../shared/utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// TEMPORARY: Auth bypassed — always authenticated as admin
const MOCK_USER_PAYLOAD: JwtPayload = {
  id: 'demo-user-001',
  email: 'admin@samavest.com',
  userRole: 'ADMIN',
  firstName: 'Demo',
  lastName: 'User'
} as any;

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  console.log('TEMPORARY: Bypassing auth for request:', req.method, req.url);

  // Set mock user on request
  req.user = MOCK_USER_PAYLOAD;

  return next();
}
