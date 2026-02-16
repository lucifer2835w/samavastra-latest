"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
const adminService = new admin_service_1.AdminService();
class AdminController {
    // --- User Management ---
    async getAllUsers(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const role = req.query.role;
            const search = req.query.search;
            const departmentId = req.query.departmentId;
            const isActive = req.query.status === 'active' ? true : req.query.status === 'inactive' ? false : undefined;
            const result = await adminService.getAllUsers(page, limit, search, role, departmentId, isActive);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "User ID required" });
            const user = await adminService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async createUser(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "User ID required" });
            const { firstName, lastName, phone, departmentId, isActive } = req.body;
            const user = await adminService.updateUser(id, {
                firstName,
                lastName,
                phone,
                departmentId,
                isActive,
            });
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async assignRoles(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId)
                return res.status(400).json({ message: "User ID required" });
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
        }
        catch (error) {
            next(error);
        }
    }
    async deactivateUser(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId)
                return res.status(400).json({ message: "User ID required" });
            await adminService.deactivateUser(userId);
            res.json({ message: 'User deactivated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId)
                return res.status(400).json({ message: "User ID required" });
            const { newPassword } = req.body;
            if (!newPassword) {
                return res.status(400).json({ message: 'New password is required' });
            }
            // Reset password by directly updating the hash
            const bcrypt = await Promise.resolve().then(() => __importStar(require('bcrypt')));
            const { env } = await Promise.resolve().then(() => __importStar(require('../../config/env')));
            const hash = await bcrypt.hash(newPassword, env.bcryptRounds);
            const { db } = await Promise.resolve().then(() => __importStar(require('../../config/firebase')));
            await db.collection('users').doc(userId).update({ passwordHash: hash, updatedAt: new Date() });
            res.json({ message: 'Password reset successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    // --- System Analytics ---
    async getSystemAnalytics(req, res, next) {
        try {
            const analytics = await adminService.getSystemAnalytics();
            res.json(analytics);
        }
        catch (error) {
            next(error);
        }
    }
    async getRoles(req, res, next) {
        try {
            const roles = await adminService.getRoles();
            res.json(roles);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map