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

            const report = await reportService.getStudentReportCard(studentId);
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

            const report = await reportService.getClassPerformanceReport(classId);
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
            const { classId, startDate, endDate } = req.query;

            const report = await reportService.getAttendanceReport(
                classId as string | undefined,
                startDate ? new Date(startDate as string) : undefined,
                endDate ? new Date(endDate as string) : undefined,
            );

            res.json(report);
        } catch (error) {
            next(error);
        }
    }

    async generateFeeCollectionReport(req: Request, res: Response, next: NextFunction) {
        try {
            const { startDate, endDate } = req.query;

            const report = await reportService.getFeeCollectionReport(
                startDate ? new Date(startDate as string) : undefined,
                endDate ? new Date(endDate as string) : undefined,
            );

            res.json(report);
        } catch (error) {
            next(error);
        }
    }

    async generateTeacherWorkloadReport(req: Request, res: Response, next: NextFunction) {
        try {
            const report = await reportService.getTeacherWorkloadReport();
            res.json(report);
        } catch (error) {
            next(error);
        }
    }
}
