export declare class StudentService {
    createStudent(data: {
        userId: string;
        studentNumber: string;
        classId?: string;
        parentId?: string;
        status?: string;
    }): Promise<any>;
    createStudentWithUser(data: {
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        studentNumber: string;
        classId?: string;
        parentId?: string;
        phone?: string | null;
    }): Promise<{
        id: string;
        userId: string;
        studentNumber: string;
        classId: string;
        parentId: string;
        status: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            isActive: boolean;
        };
        class: any;
    }>;
    getStudentById(id: string): Promise<any>;
    getStudentByUserId(userId: string): Promise<any>;
    getAllStudents(page?: number, limit?: number, classId?: string): Promise<{
        students: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateStudent(id: string, data: {
        classId?: string;
        parentId?: string;
        status?: string;
    }): Promise<any>;
}
//# sourceMappingURL=student.service.d.ts.map