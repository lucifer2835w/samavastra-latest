import { Request, Response, NextFunction } from 'express';
export declare class HomeworkController {
    createHomework(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllHomework(req: Request, res: Response, next: NextFunction): Promise<void>;
    getHomeworkBySubject(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getHomeworkById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    submitHomework(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    gradeHomework(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getStudentHomework(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getHomeworkSubmissions(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=homework.controller.d.ts.map