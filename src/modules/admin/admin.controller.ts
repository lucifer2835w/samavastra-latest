import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service';

const adminService = new AdminService();

export class AdminController {
    // --- User Management ---

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const role = req.query.role as string | undefined;
            const search = req.query.search as string | undefined;
            const departmentId = req.query.departmentId as string | undefined;
            const isActive = req.query.status === 'active' ? true : req.query.status === 'inactive' ? false : undefined;

            const result = await adminService.getAllUsers(page, limit, search, role, departmentId, isActive);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            if (!id) return res.status(400).json({ message: "User ID required" });

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
            const { email, password, firstName, lastName, phone, roles, departmentId } = req.body;

            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    message: 'Email, password, firstName, and lastName are required'
                });
            }

            const user = await adminService.createUser({
                email,
                password,
                firstName,
                lastName,
                phone,
                departmentId,
                roleNames: roles,
            });

            res.status(201).json(user);
        } catch (error: any) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            if (!id) return res.status(400).json({ message: "User ID required" });

            const { firstName, lastName, phone, departmentId, isActive } = req.body;

            const user = await adminService.updateUser(id, {
                firstName,
                lastName,
                phone,
                departmentId,
                isActive,
            });

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async assignRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string;
            if (!userId) return res.status(400).json({ message: "User ID required" });

            const { roles } = req.body;

            if (!roles || !Array.isArray(roles)) {
                return res.status(400).json({ message: 'Roles array is required' });
            }

            // Assign roles one by one
            let user;
            for (const roleId of roles) {
                user = await adminService.assignRole(userId, roleId);
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async deactivateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string;
            if (!userId) return res.status(400).json({ message: "User ID required" });

            await adminService.deactivateUser(userId);
            res.json({ message: 'User deactivated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string;
            if (!userId) return res.status(400).json({ message: "User ID required" });

            const { newPassword } = req.body;

            if (!newPassword) {
                return res.status(400).json({ message: 'New password is required' });
            }

            // Reset password by directly updating the hash
            const bcrypt = await import('bcrypt');
            const { env } = await import('../../config/env');
            const hash = await bcrypt.hash(newPassword, env.bcryptRounds);
            const { db } = await import('../../config/firebase');
            await db.collection('users').doc(userId).update({ passwordHash: hash, updatedAt: new Date() });

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

    async getRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const roles = await adminService.getRoles();
            res.json(roles);
        } catch (error) {
            next(error);
        }
    }
}
