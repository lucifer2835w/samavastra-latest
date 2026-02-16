import { Request, Response, NextFunction } from 'express';
export declare class ReportController {
    generateStudentReportCard(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    generateClassPerformanceReport(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    generateAttendanceReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    generateFeeCollectionReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    generateTeacherWorkloadReport(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=report.controller.d.ts.map