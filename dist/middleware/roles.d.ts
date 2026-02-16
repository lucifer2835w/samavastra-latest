import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
export declare function requireRoles(...roles: string[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=roles.d.ts.map