export declare class AcademicsService {
    createClass(data: {
        grade: string;
        section: string;
        teacherId?: string;
    }): Promise<any>;
    getAllClasses(): Promise<any[]>;
    getClassById(id: string): Promise<any>;
    createSubject(data: {
        name: string;
        code: string;
        description?: string;
    }): Promise<{
        id: string;
    }>;
    getAllSubjects(): Promise<{
        id: string;
    }[]>;
    assignSubjectToTeacher(subjectId: string, teacherId: string): Promise<{
        id: string;
    }>;
    assignSubjectToClass(subjectId: string, classId: string): Promise<{
        id: string;
    }>;
    createExam(data: {
        subjectId: string;
        name: string;
        date: Date;
        maxMarks: number;
    }): Promise<any>;
    getExamsBySubject(subjectId: string): Promise<any[]>;
    recordExamResult(data: {
        examId: string;
        studentId: string;
        marksObtained: number;
        grade?: string;
    }): Promise<any>;
    recordAttendance(data: {
        studentId: string;
        date: Date;
        status: string;
        remarks?: string;
    }): Promise<any>;
    getAttendanceByClass(classId: string, startDate?: Date, endDate?: Date): Promise<any[]>;
    getStudentPerformance(studentId: string): Promise<{
        examResults: {
            subject: any;
            exam: any;
            marks: any;
            maxMarks: any;
            grade: any;
        }[];
        attendance: {
            present: any;
            total: number;
            percentage: number;
        };
    }>;
}
//# sourceMappingURL=academics.service.d.ts.map