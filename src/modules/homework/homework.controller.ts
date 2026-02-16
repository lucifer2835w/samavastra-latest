import { Request, Response, NextFunction } from 'express';
import { HomeworkService } from './homework.service';

const homeworkService = new HomeworkService();

export class HomeworkController {
    async createHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const { subjectId, title, description, dueDate } = req.body;

            if (!subjectId || !title || !dueDate) {
                return res.status(400).json({
                    message: 'Subject ID, title, and due date are required',
                });
            }

            const homework = await homeworkService.createHomework({
                subjectId: parseInt(subjectId),
                title,
                description,
                dueDate: new Date(dueDate),
            });

            res.status(201).json(homework);
        } catch (error) {
            next(error);
        }
    }

    async getAllHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const homework = await homeworkService.getAllHomework();
            res.json(homework);
        } catch (error) {
            next(error);
        }
    }

    async getHomeworkBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.subjectId as string;
            if (!paramId) return res.status(400).json({ message: 'Subject ID required' });

            const subjectId = parseInt(paramId);
            const homework = await homeworkService.getHomeworkBySubject(subjectId);
            res.json(homework);
        } catch (error) {
            next(error);
        }
    }

    async getHomeworkById(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.id as string;
            if (!paramId) return res.status(400).json({ message: 'Homework ID required' });

            const id = parseInt(paramId);
            const homework = await homeworkService.getHomeworkById(id);

            if (!homework) {
                return res.status(404).json({ message: 'Homework not found' });
            }

            res.json(homework);
        } catch (error) {
            next(error);
        }
    }

    async submitHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const { homeworkId, studentId, content, fileUrl } = req.body;

            if (!homeworkId || !studentId) {
                return res.status(400).json({
                    message: 'Homework ID and student ID are required',
                });
            }

            const submission = await homeworkService.submitHomework({
                homeworkId: parseInt(homeworkId),
                studentId: parseInt(studentId),
                content,
                fileUrl,
            });

            res.status(201).json(submission);
        } catch (error) {
            next(error);
        }
    }

    async gradeHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.submissionId as string;
            if (!paramId) return res.status(400).json({ message: 'Submission ID required' });

            const submissionId = parseInt(paramId);
            const { grade } = req.body;

            if (!grade) {
                return res.status(400).json({ message: 'Grade is required' });
            }

            const submission = await homeworkService.gradeHomework(submissionId, grade);
            res.json(submission);
        } catch (error) {
            next(error);
        }
    }

    async getStudentHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.studentId as string;
            if (!paramId) return res.status(400).json({ message: 'Student ID required' });

            const studentId = parseInt(paramId);
            const homework = await homeworkService.getStudentHomework(studentId);
            res.json(homework);
        } catch (error) {
            next(error);
        }
    }

    async getHomeworkSubmissions(req: Request, res: Response, next: NextFunction) {
        try {
            const paramId = req.params.homeworkId as string;
            if (!paramId) return res.status(400).json({ message: 'Homework ID required' });

            const homeworkId = parseInt(paramId);
            const submissions = await homeworkService.getHomeworkSubmissions(homeworkId);
            res.json(submissions);
        } catch (error) {
            next(error);
        }
    }
}
