"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const password_1 = require("../../shared/utils/password");
const studentService = new student_service_1.StudentService();
class StudentController {
    async createStudent(req, res, next) {
        try {
            const { firstName, lastName, email, studentNumber, classId, parentId, phone } = req.body;
            // Basic validation
            if (!firstName || !lastName || !email || !studentNumber) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            // Default password generation
            const defaultPassword = '12345678';
            const passwordHash = await (0, password_1.hashPassword)(defaultPassword);
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
        }
        catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Student/User already exists (email or student number)' });
            }
            next(error);
        }
    }
    async getProfile(req, res, next) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const student = await studentService.getStudentByUserId(userId);
            if (!student) {
                return res.status(404).json({ message: 'Student profile not found' });
            }
            res.json(student);
        }
        catch (error) {
            next(error);
        }
    }
    async getStudent(req, res, next) {
        try {
            const id = req.params.id;
            const student = await studentService.getStudentById(id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json(student);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllStudents(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const classId = req.query.classId ? req.query.classId : undefined;
            const result = await studentService.getAllStudents(page, limit, classId);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateStudent(req, res, next) {
        try {
            const id = req.params.id;
            const { classId, parentId, status } = req.body;
            const student = await studentService.updateStudent(id, {
                classId,
                parentId,
                status,
            });
            res.json(student);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Student not found' });
            }
            next(error);
        }
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map