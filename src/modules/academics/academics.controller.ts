import { Request, Response, NextFunction } from 'express';
import { AcademicsService } from './academics.service';
import { db } from '../../config/firebase';
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
            const id = req.params.id as string;
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
                subjectId,
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
            const subjectId = req.params.subjectId as string;
            if (!subjectId) return res.status(400).json({ message: "Subject ID required" });
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
                examId,
                studentId,
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
                studentId,
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
            const classId = req.params.classId as string;
            if (!classId) return res.status(400).json({ message: "Class ID required" });
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

            if (user.roles.includes('STUDENT')) {
                const studentSnap = await db.collection('students').where('userId', '==', user.id).limit(1).get();
                if (studentSnap.empty) return res.status(404).json({ message: "Student profile not found" });
                studentId = studentSnap.docs[0].id;
            } else {
                const paramId = req.params.studentId;
                if (!paramId) return res.status(400).json({ message: "Student ID parameter required" });
                studentId = paramId as string;
            }

            if (!studentId) return res.status(400).json({ message: "Student ID required" });

            const performance = await academicsService.getStudentPerformance(studentId);
            res.json(performance);
        } catch (error) {
            next(error);
        }
    }
}
