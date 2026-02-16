export declare class PaymentService {
    createPayment(data: {
        orderId: string;
        amount: number;
        paymentMethod: string;
        transactionReference?: string;
    }): Promise<any>;
    getPaymentById(id: string): Promise<any>;
    getPaymentsByOrderId(orderId: string): Promise<{
        id: string;
    }[]>;
    updatePaymentStatus(id: string, status: string, transactionReference?: string): Promise<any>;
    processRefund(orderId: string, amount: number, reason?: string): Promise<any>;
    getAllPayments(page?: number, limit?: number, status?: string, orderId?: string): Promise<{
        payments: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getPaymentStats(): Promise<{
        total: number;
        byStatus: {
            pending: number;
            completed: number;
            failed: number;
        };
        totalRevenue: number;
        totalRefunds: number;
    }>;
}
//# sourceMappingURL=payment.service.d.ts.map