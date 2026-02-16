"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentController = void 0;
const parent_service_1 = require("./parent.service");
const parentService = new parent_service_1.ParentService();
class ParentController {
    async getParentChildren(req, res, next) {
        try {
            const parentId = req.params.parentId;
            if (!parentId)
                return res.status(400).json({ message: 'Parent ID required' });
            const children = await parentService.getParentChildren(parentId);
            res.json(children);
        }
        catch (error) {
            next(error);
        }
    }
    async getChildPerformance(req, res, next) {
        try {
            const parentId = req.params.parentId;
            const studentId = req.params.studentId;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }
            const performance = await parentService.getChildPerformance(parentId, studentId);
            res.json(performance);
        }
        catch (error) {
            if (error.message === 'Access denied to this student') {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }
    async getChildGrades(req, res, next) {
        try {
            const parentId = req.params.parentId;
            const studentId = req.params.studentId;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }
            const grades = await parentService.getChildGrades(parentId, studentId);
            res.json(grades);
        }
        catch (error) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }
    async getChildAttendance(req, res, next) {
        try {
            const parentId = req.params.parentId;
            const studentId = req.params.studentId;
            const days = req.query.days ? parseInt(req.query.days) : 30;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }
            const attendance = await parentService.getChildAttendance(parentId, studentId, days);
            res.json(attendance);
        }
        catch (error) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }
    async getChildFees(req, res, next) {
        try {
            const parentId = req.params.parentId;
            const studentId = req.params.studentId;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }
            const fees = await parentService.getChildFees(parentId, studentId);
            res.json(fees);
        }
        catch (error) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }
    async getChildHomework(req, res, next) {
        try {
            const parentId = req.params.parentId;
            const studentId = req.params.studentId;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }
            const homework = await parentService.getChildHomework(parentId, studentId);
            res.json(homework);
        }
        catch (error) {
            if (error.message.includes('Access denied')) {
                return res.status(403).json({ message: error.message });
            }
            next(error);
        }
    }
    async updateAccess(req, res, next) {
        try {
            const parentId = req.params.parentId;
            const studentId = req.params.studentId;
            const permissions = req.body;
            if (!parentId || !studentId) {
                return res.status(400).json({ message: 'Parent ID and Student ID required' });
            }
            const access = await parentService.updateAccess(parentId, studentId, permissions);
            res.json(access);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ParentController = ParentController;
//# sourceMappingURL=parent.controller.js.map