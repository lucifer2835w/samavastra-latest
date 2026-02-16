import { Request, Response, NextFunction } from 'express';
import { TeacherService } from './teacher.service';
import { AuthenticatedRequest } from '../../middleware/auth';

const teacherService = new TeacherService();

export class TeacherController {
    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as AuthenticatedRequest).user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const teacher = await teacherService.getTeacherByUserId(userId);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher profile not found' });
            }

            res.json(teacher);
        } catch (error) {
            next(error);
        }
    }

    async getTeacher(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const teacher = await teacherService.getTeacherById(id);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            res.json(teacher);
        } catch (error) {
            next(error);
        }
    }

    async getAllTeachers(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;

            const result = await teacherService.getAllTeachers(page, limit);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateTeacher(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { qualification } = req.body;

            const teacher = await teacherService.updateTeacher(id, {
                qualification,
            });

            res.json(teacher);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            next(error);
        }
    }
}
