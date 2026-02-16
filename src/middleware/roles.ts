import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export function requireRoles(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const hasRole = user.roles.some((r) => roles.includes(r));
    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  };
}

