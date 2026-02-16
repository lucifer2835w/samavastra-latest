import { Request, Response, NextFunction } from 'express';
export declare class AcademicsController {
    createClass(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllClasses(req: Request, res: Response, next: NextFunction): Promise<void>;
    getClass(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    createSubject(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllSubjects(req: Request, res: Response, next: NextFunction): Promise<void>;
    createExam(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getExamsBySubject(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    recordExamResult(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    recordAttendance(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAttendanceByClass(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getStudentPerformance(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=academics.controller.d.ts.map