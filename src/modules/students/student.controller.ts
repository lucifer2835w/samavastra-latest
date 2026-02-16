import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth';
import { StudentService } from './student.service';
import { hashPassword } from '../../shared/utils/password';

const studentService = new StudentService();

export class StudentController {
    async createStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, studentNumber, classId, parentId, phone } = req.body;

            // Basic validation
            if (!firstName || !lastName || !email || !studentNumber) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Default password generation
            const defaultPassword = '12345678';
            const passwordHash = await hashPassword(defaultPassword);

            const student = await studentService.createStudentWithUser({
                firstName,
                lastName,
                email,
                studentNumber,
                classId: classId || undefined,
                parentId: parentId || undefined,
                phone: phone || null,
                passwordHash,
            });

            res.status(201).json(student);
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Student/User already exists (email or student number)' });
            }
            next(error);
        }
    }

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as AuthenticatedRequest).user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const student = await studentService.getStudentByUserId(userId);
            if (!student) {
                return res.status(404).json({ message: 'Student profile not found' });
            }

            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    async getStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const student = await studentService.getStudentById(id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    async getAllStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const classId = req.query.classId ? (req.query.classId as string) : undefined;

            const result = await studentService.getAllStudents(page, limit, classId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { classId, parentId, status } = req.body;

            const student = await studentService.updateStudent(id, {
                classId,
                parentId,
                status,
            });

            res.json(student);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Student not found' });
            }
            next(error);
        }
    }
}
