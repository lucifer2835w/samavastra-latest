import { Request, Response, NextFunction } from 'express';
import { ReportService } from './report.service';

const reportService = new ReportService();

export class ReportController {
    async generateStudentReportCard(req: Request, res: Response, next: NextFunction) {
        try {
            const studentId = req.params.studentId as string;
            if (!studentId) {
                return res.status(400).json({ message: 'Student ID required' });
            }

            const report = await reportService.generateStudentReportCard(parseInt(studentId));
            res.json(report);
        } catch (error: any) {
            if (error.message === 'Student not found') {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    async generateClassPerformanceReport(req: Request, res: Response, next: NextFunction) {
        try {
            const classId = req.params.classId as string;
            if (!classId) {
                return res.status(400).json({ message: 'Class ID required' });
            }

            const report = await reportService.generateClassPerformanceReport(parseInt(classId));
            res.json(report);
        } catch (error: any) {
            if (error.message === 'Class not found') {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    async generateAttendanceReport(req: Request, res: Response, next: NextFunction) {
        try {
            const { classId, studentId, startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).json({ message: 'Start date and end date required' });
            }

            const report = await reportService.generateAttendanceReport({
                ...(classId && { classId: parseInt(classId as string) }),
                ...(studentId && { studentId: parseInt(studentId as string) }),
                startDate: new Date(startDate as string),
                endDate: new Date(endDate as string),
            });

            res.json(report);
        } catch (error) {
            next(error);
        }
    }

    async generateFeeCollectionReport(req: Request, res: Response, next: NextFunction) {
        try {
            const { startDate, endDate, status } = req.query;

            const report = await reportService.generateFeeCollectionReport({
                ...(startDate && { startDate: new Date(startDate as string) }),
                ...(endDate && { endDate: new Date(endDate as string) }),
                ...(status && { status: status as string }),
            });

            res.json(report);
        } catch (error) {
            next(error);
        }
    }

    async generateTeacherWorkloadReport(req: Request, res: Response, next: NextFunction) {
        try {
            const teacherId = req.query.teacherId;

            const report = await reportService.generateTeacherWorkloadReport(
                teacherId ? parseInt(teacherId as string) : undefined
            );

            res.json(report);
        } catch (error) {
            next(error);
        }
    }
}
