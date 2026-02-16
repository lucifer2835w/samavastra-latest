import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service';

const adminService = new AdminService();

export class AdminController {
    // --- User Management ---

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { role, search, status } = req.query;
            const users = await adminService.getAllUsers({
                role: role as string,
                search: search as string,
                status: status as string
            });
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.id;
            if (!paramId) return res.status(400).json({ message: "User ID required" });

            const id = parseInt(paramId as string);
            const user = await adminService.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, firstName, lastName, phone, roles } = req.body;

            if (!email || !password || !firstName || !lastName || !roles) {
                return res.status(400).json({
                    message: 'Email, password, firstName, lastName, and roles are required'
                });
            }

            const user = await adminService.createUser({
                email,
                password,
                firstName,
                lastName,
                phone,
                roles
            });

            res.status(201).json(user);
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Email already exists' });
            }
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.id;
            if (!paramId) return res.status(400).json({ message: "User ID required" });

            const id = parseInt(paramId as string);
            const { email, firstName, lastName, phone } = req.body;

            const user = await adminService.updateUser(id, {
                email,
                firstName,
                lastName,
                phone
            });

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async assignRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.id;
            if (!paramId) return res.status(400).json({ message: "User ID required" });

            const userId = parseInt(paramId as string);
            const { roles } = req.body;

            if (!roles || !Array.isArray(roles)) {
                return res.status(400).json({ message: 'Roles array is required' });
            }

            const user = await adminService.assignRoles(userId, roles);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async deactivateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.id;
            if (!paramId) return res.status(400).json({ message: "User ID required" });

            const userId = parseInt(paramId as string);
            await adminService.deactivateUser(userId);
            res.json({ message: 'User deactivated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.id;
            if (!paramId) return res.status(400).json({ message: "User ID required" });

            const userId = parseInt(paramId as string);
            const { newPassword } = req.body;

            if (!newPassword) {
                return res.status(400).json({ message: 'New password is required' });
            }

            await adminService.resetPassword(userId, newPassword);
            res.json({ message: 'Password reset successfully' });
        } catch (error) {
            next(error);
        }
    }

    // --- System Analytics ---

    async getSystemAnalytics(req: Request, res: Response, next: NextFunction) {
        try {
            const analytics = await adminService.getSystemAnalytics();
            res.json(analytics);
        } catch (error) {
            next(error);
        }
    }

    async getEnrollmentTrends(req: Request, res: Response, next: NextFunction) {
        try {
            const months = req.query.months ? parseInt(req.query.months as string) : 6;
            const trends = await adminService.getEnrollmentTrends(months);
            res.json(trends);
        } catch (error) {
            next(error);
        }
    }

    async getClassDistribution(req: Request, res: Response, next: NextFunction) {
        try {
            const distribution = await adminService.getClassDistribution();
            res.json(distribution);
        } catch (error) {
            next(error);
        }
    }
}
