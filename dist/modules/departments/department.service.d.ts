export declare class DepartmentService {
    createDepartment(data: {
        name: string;
        code: string;
    }): Promise<{
        id: string;
    }>;
    getAllDepartments(): Promise<{
        id: string;
    }[]>;
    getDepartmentById(id: string): Promise<any>;
}
//# sourceMappingURL=department.service.d.ts.map