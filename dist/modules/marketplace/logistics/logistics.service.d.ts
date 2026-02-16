export declare class LogisticsService {
    createTracking(data: {
        orderId: string;
        trackingNumber: string;
        status: string;
        estimatedDelivery?: Date;
    }): Promise<any>;
    getTrackingById(id: string): Promise<any>;
    getTrackingByNumber(trackingNumber: string): Promise<any>;
    getTrackingByOrderId(orderId: string): Promise<{
        id: string;
    }[]>;
    updateTracking(id: string, data: {
        status?: string;
        estimatedDelivery?: Date;
        actualDelivery?: Date;
    }): Promise<any>;
    markAsDelivered(id: string): Promise<{
        status: string;
        actualDelivery: Date;
        id: string;
    }>;
    getAllTracking(page?: number, limit?: number, status?: string): Promise<{
        tracking: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getLogisticsStats(): Promise<{
        total: number;
        byStatus: {
            pending: number;
            inTransit: number;
            delivered: number;
        };
    }>;
}
//# sourceMappingURL=logistics.service.d.ts.map