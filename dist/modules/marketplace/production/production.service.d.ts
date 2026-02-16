export declare class ProductionService {
    getAllLogs(page?: number, limit?: number): Promise<{
        logs: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createLog(data: {
        productId: string;
        departmentId?: string;
        batchNumber: string;
        quantityProduced: number;
        notes?: string;
    }): Promise<{
        id: string;
        productId: string;
        departmentId: string;
        batchNumber: string;
        quantityProduced: number;
        timestamp: Date;
        notes: string;
        product: {
            id: string;
        };
        department: {
            id: string;
        };
    }>;
    getStats(): Promise<{
        totalLogs: number;
        totalQuantity: number;
        recentLogs: any[];
    }>;
}
//# sourceMappingURL=production.service.d.ts.map