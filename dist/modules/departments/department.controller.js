"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const department_service_1 = require("./department.service");
// import { AuthenticatedRequest } from '../../middleware/auth';
const departmentService = new department_service_1.DepartmentService();
class DepartmentController {
    async createDepartment(req, res, next) {
        try {
            const { name, code } = req.body;
            if (!name || !code) {
                return res.status(400).json({ message: 'Name and code are required' });
            }
            const department = await departmentService.createDepartment({ name, code });
            res.status(201).json(department);
        }
        catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Department code already exists' });
            }
            next(error);
        }
    }
    async getAllDepartments(req, res, next) {
        try {
            const departments = await departmentService.getAllDepartments();
            res.json(departments);
        }
        catch (error) {
            next(error);
        }
    }
    async getDepartment(req, res, next) {
        try {
            const id = req.params.id;
            const department = await departmentService.getDepartmentById(id);
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }
            res.json(department);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map