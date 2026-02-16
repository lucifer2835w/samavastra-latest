export declare class AdminService {
    createUser(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
        departmentId?: string;
        roleNames?: string[];
    }): Promise<{
        roles: any[];
        id: string;
    }>;
    getUserById(id: string): Promise<any>;
    getAllUsers(page?: number, limit?: number, search?: string, role?: string, departmentId?: string, isActive?: boolean): Promise<{
        users: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateUser(id: string, data: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        departmentId?: string;
        isActive?: boolean;
    }): Promise<any>;
    assignRole(userId: string, roleId: string): Promise<any>;
    removeRole(userId: string, roleId: string): Promise<any>;
    deactivateUser(id: string): Promise<any>;
    activateUser(id: string): Promise<any>;
    getSystemAnalytics(): Promise<{
        users: {
            total: number;
            active: number;
            byRole: Record<string, number>;
        };
        students: {
            total: number;
        };
        fees: {
            total: number;
            collected: number;
            pending: number;
            overdue: number;
        };
        attendance: Record<string, number>;
    }>;
    getRoles(): Promise<{
        id: string;
    }[]>;
}
//# sourceMappingURL=admin.service.d.ts.map