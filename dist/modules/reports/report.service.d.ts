export declare class ReportService {
    getStudentReportCard(studentId: string): Promise<{
        student: any;
        grades: {
            averageMarks: number;
            totalExams: number;
            highestMarks: number;
            lowestMarks: number;
        };
        examResults: {
            exam: any;
            subject: any;
            marks: any;
            maxMarks: any;
            grade: any;
        }[];
        attendance: {
            total: number;
            present: number;
            absent: number;
            late: number;
            excused: number;
            percentage: number;
        };
        fees: {
            total: number;
            paid: number;
            pending: number;
            overdue: number;
        };
    }>;
    getClassPerformanceReport(classId: string): Promise<{
        class: any;
        totalStudents: number;
        students: any[];
    }>;
    getAttendanceReport(classId?: string, startDate?: Date, endDate?: Date): Promise<{
        stats: {
            total: number;
            present: number;
            absent: number;
            late: number;
            excused: number;
            percentage: number;
        };
        totalRecords: number;
    }>;
    getFeeCollectionReport(startDate?: Date, endDate?: Date): Promise<{
        stats: {
            total: number;
            paid: number;
            pending: number;
            overdue: number;
        };
        totalRecords: number;
        byStatus: {
            paid: number;
            pending: number;
            overdue: number;
        };
    }>;
    getTeacherWorkloadReport(): Promise<any[]>;
}
//# sourceMappingURL=report.service.d.ts.map