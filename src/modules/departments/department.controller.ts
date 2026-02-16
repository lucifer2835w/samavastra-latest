import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from './department.service';
// import { AuthenticatedRequest } from '../../middleware/auth';

const departmentService = new DepartmentService();

export class DepartmentController {
    async createDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, code } = req.body;
            if (!name || !code) {
                return res.status(400).json({ message: 'Name and code are required' });
            }
            const department = await departmentService.createDepartment({ name, code });
            res.status(201).json(department);
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Department code already exists' });
            }
            next(error);
        }
    }

    async getAllDepartments(req: Request, res: Response, next: NextFunction) {
        try {
            const departments = await departmentService.getAllDepartments();
            res.json(departments);
        } catch (error) {
            next(error);
        }
    }

    async getDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const department = await departmentService.getDepartmentById(id);
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }
            res.json(department);
        } catch (error) {
            next(error);
        }
    }
}
