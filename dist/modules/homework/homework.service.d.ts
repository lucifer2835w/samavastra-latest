export declare class HomeworkService {
    createHomework(data: {
        subjectId: string;
        title: string;
        description?: string;
        dueDate: Date;
    }): Promise<any>;
    getAllHomework(): Promise<any[]>;
    getHomeworkBySubject(subjectId: string): Promise<any[]>;
    getHomeworkById(id: string): Promise<any>;
    submitHomework(data: {
        homeworkId: string;
        studentId: string;
        content?: string;
        fileUrl?: string;
    }): Promise<any>;
    gradeHomework(submissionId: string, grade: string): Promise<any>;
    getStudentHomework(studentId: string): Promise<{
        submissions: any[];
        allHomework: any[];
    }>;
    getHomeworkSubmissions(homeworkId: string): Promise<any[]>;
}
//# sourceMappingURL=homework.service.d.ts.map