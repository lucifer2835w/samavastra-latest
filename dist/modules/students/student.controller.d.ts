import { NextFunction, Request, Response } from 'express';
export declare class StudentController {
    createStudent(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getStudent(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllStudents(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateStudent(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=student.controller.d.ts.map