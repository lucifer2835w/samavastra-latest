"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const report_service_1 = require("./report.service");
const reportService = new report_service_1.ReportService();
class ReportController {
    async generateStudentReportCard(req, res, next) {
        try {
            const studentId = req.params.studentId;
            if (!studentId) {
                return res.status(400).json({ message: 'Student ID required' });
            }
            const report = await reportService.getStudentReportCard(studentId);
            res.json(report);
        }
        catch (error) {
            if (error.message === 'Student not found') {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }
    async generateClassPerformanceReport(req, res, next) {
        try {
            const classId = req.params.classId;
            if (!classId) {
                return res.status(400).json({ message: 'Class ID required' });
            }
            const report = await reportService.getClassPerformanceReport(classId);
            res.json(report);
        }
        catch (error) {
            if (error.message === 'Class not found') {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }
    async generateAttendanceReport(req, res, next) {
        try {
            const { classId, startDate, endDate } = req.query;
            const report = await reportService.getAttendanceReport(classId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
            res.json(report);
        }
        catch (error) {
            next(error);
        }
    }
    async generateFeeCollectionReport(req, res, next) {
        try {
            const { startDate, endDate } = req.query;
            const report = await reportService.getFeeCollectionReport(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
            res.json(report);
        }
        catch (error) {
            next(error);
        }
    }
    async generateTeacherWorkloadReport(req, res, next) {
        try {
            const report = await reportService.getTeacherWorkloadReport();
            res.json(report);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map