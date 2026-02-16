"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const teacher_service_1 = require("./teacher.service");
const teacherService = new teacher_service_1.TeacherService();
class TeacherController {
    async getProfile(req, res, next) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const teacher = await teacherService.getTeacherByUserId(userId);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher profile not found' });
            }
            res.json(teacher);
        }
        catch (error) {
            next(error);
        }
    }
    async getTeacher(req, res, next) {
        try {
            const id = req.params.id;
            const teacher = await teacherService.getTeacherById(id);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            res.json(teacher);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllTeachers(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await teacherService.getAllTeachers(page, limit);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateTeacher(req, res, next) {
        try {
            const id = req.params.id;
            const { qualification } = req.body;
            const teacher = await teacherService.updateTeacher(id, {
                qualification,
            });
            res.json(teacher);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            next(error);
        }
    }
}
exports.TeacherController = TeacherController;
//# sourceMappingURL=teacher.controller.js.map