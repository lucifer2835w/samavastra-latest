export declare class ParentService {
    getParentChildren(parentId: string): Promise<any[]>;
    getChildPerformance(parentId: string, studentId: string): Promise<any>;
    getChildGrades(parentId: string, studentId: string): Promise<any[]>;
    getChildAttendance(parentId: string, studentId: string, days?: number): Promise<{
        id: string;
    }[]>;
    getChildFees(parentId: string, studentId: string): Promise<{
        id: string;
    }[]>;
    getChildHomework(parentId: string, studentId: string): Promise<any[]>;
    updateAccess(parentId: string, studentId: string, permissions: {
        canViewGrades?: boolean;
        canViewAttendance?: boolean;
        canViewFees?: boolean;
        canViewHomework?: boolean;
    }): Promise<{
        id: string;
    }>;
    private verifyAccess;
}
//# sourceMappingURL=parent.service.d.ts.map