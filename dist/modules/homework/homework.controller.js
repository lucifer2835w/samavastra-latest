"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeworkController = void 0;
const homework_service_1 = require("./homework.service");
const homeworkService = new homework_service_1.HomeworkService();
class HomeworkController {
    async createHomework(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async getAllHomework(req, res, next) {
        try {
            const homework = await homeworkService.getAllHomework();
            res.json(homework);
        }
        catch (error) {
            next(error);
        }
    }
    async getHomeworkBySubject(req, res, next) {
        try {
            const subjectId = req.params.subjectId;
            if (!subjectId)
                return res.status(400).json({ message: 'Subject ID required' });
            const homework = await homeworkService.getHomeworkBySubject(subjectId);
            res.json(homework);
        }
        catch (error) {
            next(error);
        }
    }
    async getHomeworkById(req, res, next) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: 'Homework ID required' });
            const homework = await homeworkService.getHomeworkById(id);
            if (!homework) {
                return res.status(404).json({ message: 'Homework not found' });
            }
            res.json(homework);
        }
        catch (error) {
            next(error);
        }
    }
    async submitHomework(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async gradeHomework(req, res, next) {
        try {
            const submissionId = req.params.submissionId;
            if (!submissionId)
                return res.status(400).json({ message: 'Submission ID required' });
            const { grade } = req.body;
            if (!grade) {
                return res.status(400).json({ message: 'Grade is required' });
            }
            const submission = await homeworkService.gradeHomework(submissionId, grade);
            res.json(submission);
        }
        catch (error) {
            next(error);
        }
    }
    async getStudentHomework(req, res, next) {
        try {
            const studentId = req.params.studentId;
            if (!studentId)
                return res.status(400).json({ message: 'Student ID required' });
            const homework = await homeworkService.getStudentHomework(studentId);
            res.json(homework);
        }
        catch (error) {
            next(error);
        }
    }
    async getHomeworkSubmissions(req, res, next) {
        try {
            const homeworkId = req.params.homeworkId;
            if (!homeworkId)
                return res.status(400).json({ message: 'Homework ID required' });
            const submissions = await homeworkService.getHomeworkSubmissions(homeworkId);
            res.json(submissions);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.HomeworkController = HomeworkController;
//# sourceMappingURL=homework.controller.js.map