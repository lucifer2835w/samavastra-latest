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
                subjectId,
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
            const subjectId = req.params.subjectId as string;
            if (!subjectId) return res.status(400).json({ message: 'Subject ID required' });

            const homework = await homeworkService.getHomeworkBySubject(subjectId);
            res.json(homework);
        } catch (error) {
            next(error);
        }
    }

    async getHomeworkById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            if (!id) return res.status(400).json({ message: 'Homework ID required' });

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
                homeworkId,
                studentId,
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
            const submissionId = req.params.submissionId as string;
            if (!submissionId) return res.status(400).json({ message: 'Submission ID required' });

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
            const studentId = req.params.studentId as string;
            if (!studentId) return res.status(400).json({ message: 'Student ID required' });

            const homework = await homeworkService.getStudentHomework(studentId);
            res.json(homework);
        } catch (error) {
            next(error);
        }
    }

    async getHomeworkSubmissions(req: Request, res: Response, next: NextFunction) {
        try {
            const homeworkId = req.params.homeworkId as string;
            if (!homeworkId) return res.status(400).json({ message: 'Homework ID required' });

            const submissions = await homeworkService.getHomeworkSubmissions(homeworkId);
            res.json(submissions);
        } catch (error) {
            next(error);
        }
    }
}
