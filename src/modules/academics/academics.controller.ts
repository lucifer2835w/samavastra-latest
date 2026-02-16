import { Request, Response, NextFunction } from 'express';
import { AcademicsService } from './academics.service';
import { prisma } from '../../config/db';
import { AuthenticatedRequest } from '../../middleware/auth';

const academicsService = new AcademicsService();

export class AcademicsController {
    // --- Classes ---
    async createClass(req: Request, res: Response, next: NextFunction) {
        try {
            const { grade, section, teacherId } = req.body;
            if (!grade || !section) {
                return res.status(400).json({ message: 'Grade and section are required' });
            }
            const newClass = await academicsService.createClass({ grade, section, teacherId });
            res.status(201).json(newClass);
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Class already exists' });
            }
            next(error);
        }
    }

    async getAllClasses(req: Request, res: Response, next: NextFunction) {
        try {
            const classes = await academicsService.getAllClasses();
            res.json(classes);
        } catch (error) {
            next(error);
        }
    }

    async getClass(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const classItem = await academicsService.getClassById(id);
            if (!classItem) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.json(classItem);
        } catch (error) {
            next(error);
        }
    }

    // --- Subjects ---
    async createSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, code, description } = req.body;
            if (!name || !code) {
                return res.status(400).json({ message: 'Name and code are required' });
            }
            const subject = await academicsService.createSubject({ name, code, description });
            res.status(201).json(subject);
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Subject code already exists' });
            }
            next(error);
        }
    }

    async getAllSubjects(req: Request, res: Response, next: NextFunction) {
        try {
            const subjects = await academicsService.getAllSubjects();
            res.json(subjects);
        } catch (error) {
            next(error);
        }
    }

    // --- Exams ---
    async createExam(req: Request, res: Response, next: NextFunction) {
        try {
            const { subjectId, name, date, maxMarks } = req.body;
            if (!subjectId || !name || !date || !maxMarks) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const exam = await academicsService.createExam({
                subjectId: parseInt(subjectId),
                name,
                date: new Date(date),
                maxMarks: parseInt(maxMarks),
            });
            res.status(201).json(exam);
        } catch (error) {
            next(error);
        }
    }

    async getExamsBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.subjectId;
            if (!paramId) return res.status(400).json({ message: "Subject ID required" });
            const subjectId = parseInt(paramId as string);
            const exams = await academicsService.getExamsBySubject(subjectId);
            res.json(exams);
        } catch (error) {
            next(error);
        }
    }

    async recordExamResult(req: Request, res: Response, next: NextFunction) {
        try {
            const { examId, studentId, marksObtained, grade } = req.body;
            if (!examId || !studentId || marksObtained === undefined) {
                return res.status(400).json({ message: 'examId, studentId, and marksObtained are required' });
            }
            const result = await academicsService.recordExamResult({
                examId: parseInt(examId),
                studentId: parseInt(studentId),
                marksObtained: parseFloat(marksObtained),
                grade,
            });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    // --- Attendance ---
    async recordAttendance(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentId, date, status, remarks } = req.body;
            if (!studentId || !date || !status) {
                return res.status(400).json({ message: 'studentId, date, and status are required' });
            }
            const attendance = await academicsService.recordAttendance({
                studentId: parseInt(studentId),
                date: new Date(date),
                status,
                remarks,
            });
            res.json(attendance);
        } catch (error) {
            next(error);
        }
    }

    async getAttendanceByClass(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.classId;
            if (!paramId) return res.status(400).json({ message: "Class ID required" });
            const classId = parseInt(paramId as string);
            const { startDate, endDate } = req.query;
            const attendance = await academicsService.getAttendanceByClass(
                classId,
                startDate ? new Date(startDate as string) : undefined,
                endDate ? new Date(endDate as string) : undefined
            );
            res.json(attendance);
        } catch (error) {
            next(error);
        }
    }

    // --- Performance ---
    async getStudentPerformance(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const user = req.user;
            let studentId;

            // If student, use own ID
            if (user.roles.includes('STUDENT')) {
                // user.student is not automatically populated by basic auth middleware usually,
                // but let's assume we can find it or user.id is linked.
                // Ideally middleware should populate full profile. 
                // For now, let's fetch based on userId -> student record check
                // Quick fix: assuming we will pass studentId as param or logic in service handles userId
                // But service expects studentId. 
                // Let's rely on a helper or just query:
                const student = await prisma.student.findUnique({ where: { userId: user.id } });
                if (!student) return res.status(404).json({ message: "Student profile not found" });
                studentId = student.id;
            } else {
                // Teacher/Admin requesting specific student
                const paramId = req.params.studentId;
                if (!paramId) return res.status(400).json({ message: "Student ID parameter required" });
                studentId = parseInt(paramId as string);
            }

            if (!studentId) return res.status(400).json({ message: "Student ID required" });

            const performance = await academicsService.getStudentPerformance(studentId);
            res.json(performance);
        } catch (error) {
            next(error);
        }
    }
}
