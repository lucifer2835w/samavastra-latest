export declare class TeacherService {
    createTeacher(data: {
        userId: string;
        employeeId: string;
        qualification?: string;
    }): Promise<any>;
    getTeacherById(id: string): Promise<any>;
    getTeacherByUserId(userId: string): Promise<any>;
    getAllTeachers(page?: number, limit?: number): Promise<{
        teachers: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateTeacher(id: string, data: {
        qualification?: string;
    }): Promise<any>;
}
//# sourceMappingURL=teacher.service.d.ts.map