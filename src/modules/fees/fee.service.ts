import { prisma } from '../../config/db';
import { Fee } from '../../generated/prisma/client';

export class FeeService {
    async createFee(data: {
        studentId: number;
        title: string;
        amount: number;
        dueDate: Date;
    }) {
        return prisma.fee.create({
            data: {
                studentId: data.studentId,
                title: data.title,
                amount: data.amount,
                dueDate: data.dueDate,
                status: 'PENDING',
            }
        });
    }

    async getFeesForStudent(studentId: number) {
        return prisma.fee.findMany({
            where: { studentId },
            orderBy: { dueDate: 'asc' }
        });
    }

    async payFee(feeId: number, transactionRef: string) {
        return prisma.fee.update({
            where: { id: feeId },
            data: {
                status: 'PAID',
                paymentDate: new Date(),
                transactionRef
            }
        });
    }
}
