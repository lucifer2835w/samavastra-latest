export declare class FeeService {
    createFee(data: {
        studentId: string;
        title: string;
        amount: number;
        dueDate: Date;
    }): Promise<{
        id: string;
    }>;
    getFeesForStudent(studentId: string): Promise<{
        id: string;
    }[]>;
    payFee(feeId: string, transactionRef: string): Promise<{
        id: string;
    }>;
}
//# sourceMappingURL=fee.service.d.ts.map