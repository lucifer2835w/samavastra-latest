export declare class OrderService {
    createOrder(data: {
        studentId: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
    }): Promise<{
        id: string;
        studentId: string;
        status: string;
        totalAmount: number;
        items: {
            productId: string;
            quantity: number;
            unitPrice: number;
        }[];
        createdAt: Date;
    }>;
    getOrderById(id: string): Promise<any>;
    getAllOrders(page?: number, limit?: number, status?: string, studentId?: string): Promise<{
        orders: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    updateOrderStatus(id: string, status: string): Promise<any>;
    cancelOrder(id: string): Promise<{
        status: string;
        id: string;
    }>;
    getOrderStats(): Promise<{
        total: number;
        byStatus: {
            pending: number;
            processing: number;
            completed: number;
            cancelled: number;
        };
        totalRevenue: number;
    }>;
}
//# sourceMappingURL=order.service.d.ts.map