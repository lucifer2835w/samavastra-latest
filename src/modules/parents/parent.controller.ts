import { Request, Response, NextFunction } from 'express';
import { ParentService } from './parent.service';

const parentService = new ParentService();

export class ParentController {
    async getParentChildren(req: Request, res: Response, next: NextFunction) {
        try {
            const parentId = req.params.parentId as string;
            if (!parentId) return res.status(400).json({ message: 'Parent ID required' });

            const children = await parentService.getParentChildren(parentId);
            res.json(children);
        } catch (error) {
            next(error);
        }
    }

    async getChildPerformance(req: Request, res: Response, next: NextFunction) {
        try {
            const parentId = req.params.parentId as string;
            const studentId = req.params.studentId as string;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }

            const performance = await parentService.getChildPerformance(parentId, studentId);
            res.json(performance);
        } catch (error: any) {
            if (error.message === 'Access denied to this student') {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }

    async getChildGrades(req: Request, res: Response, next: NextFunction) {
        try {
            const parentId = req.params.parentId as string;
            const studentId = req.params.studentId as string;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }

            const grades = await parentService.getChildGrades(parentId, studentId);
            res.json(grades);
        } catch (error: any) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }

    async getChildAttendance(req: Request, res: Response, next: NextFunction) {
        try {
            const parentId = req.params.parentId as string;
            const studentId = req.params.studentId as string;
            const days = req.query.days ? parseInt(req.query.days as string) : 30;

            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }

            const attendance = await parentService.getChildAttendance(parentId, studentId, days);
            res.json(attendance);
        } catch (error: any) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }

    async getChildFees(req: Request, res: Response, next: NextFunction) {
        try {
            const parentId = req.params.parentId as string;
            const studentId = req.params.studentId as string;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }

            const fees = await parentService.getChildFees(parentId, studentId);
            res.json(fees);
        } catch (error: any) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }

    async getChildHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const parentId = req.params.parentId as string;
            const studentId = req.params.studentId as string;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }

            const homework = await parentService.getChildHomework(parentId, studentId);
            res.json(homework);
        } catch (error: any) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }

    async updateAccess(req: Request, res: Response, next: NextFunction) {
        try {
            const parentId = req.params.parentId as string;
            const studentId = req.params.studentId as string;
            const permissions = req.body;

            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }

            const access = await parentService.updateAccess(parentId, studentId, permissions);
            res.json(access);
        } catch (error) {
            next(error);
        }
    }
}
