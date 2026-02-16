import { prisma } from '../../../config/db';
import { Prisma } from '../../../generated/prisma/client';
export class PaymentService {
    /**
     * Create a payment for an order
     */
    async createPayment(data: {
        orderId: number;
        amount: number;
        paymentMethod: string;
        transactionReference?: string;
    }) {
        return await prisma.payment.create({
            data: {
                orderId: data.orderId,
                amount: data.amount,
                status: 'PENDING',
                paymentMethod: data.paymentMethod,
                transactionReference: data.transactionReference ?? null,
            },
            include: {
                order: {
                    include: {
                        student: {
                            include: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    /**
     * Get payment by ID
     */
    async getPaymentById(id: number) {
        return await prisma.payment.findUnique({
            where: { id },
            include: {
                order: {
                    include: {
                        student: {
                            include: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });
    }

    /**
     * Get payments for an order
     */
    async getPaymentsByOrderId(orderId: number) {
        return await prisma.payment.findMany({
            where: { orderId },
            orderBy: {
                id: 'desc',
            },
        });
    }

    /**
     * Update payment status
     */
    async updatePaymentStatus(
        id: number,
        status: string,
        transactionReference?: string
    ) {
        const data: any = { status };

        if (status === 'COMPLETED') {
            data.paidAt = new Date();
        }

        if (transactionReference) {
            data.transactionReference = transactionReference;
        }

        return await prisma.$transaction(async (tx) => {
            const payment = await tx.payment.update({
                where: { id },
                data,
                include: {
                    order: true,
                },
            });

            // If payment is completed, update order status
            if (status === 'COMPLETED') {
                const orderPayments = await tx.payment.findMany({
                    where: { orderId: payment.orderId },
                });

                const totalPaid = orderPayments.reduce((sum, p) => {
                    if (p.status === 'COMPLETED') {
                        return sum + Number(p.amount);
                    }
                    return sum;
                }, 0);

                const order = await tx.order.findUnique({
                    where: { id: payment.orderId },
                });

                if (order && totalPaid >= Number(order.totalAmount)) {
                    await tx.order.update({
                        where: { id: payment.orderId },
                        data: { status: 'PROCESSING' },
                    });
                }
            }

            return payment;
        });
    }

    /**
     * Process a refund
     */
    async processRefund(orderId: number, amount: number, reason?: string) {
        return await prisma.payment.create({
            data: {
                orderId,
                amount: -Math.abs(amount), // Negative amount for refund
                status: 'COMPLETED',
                paymentMethod: 'REFUND',
                transactionReference: `REFUND-${Date.now()}`,
                paidAt: new Date(),
            },
            include: {
                order: {
                    include: {
                        student: {
                            include: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    /**
     * Get all payments with pagination
     */
    async getAllPayments(
        page: number = 1,
        limit: number = 20,
        status?: string,
        orderId?: number
    ) {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (orderId) {
            where.orderId = orderId;
        }

        const [payments, total] = await Promise.all([
            prisma.payment.findMany({
                skip,
                take: limit,
                where,
                include: {
                    order: {
                        include: {
                            student: {
                                include: {
                                    user: {
                                        select: {
                                            firstName: true,
                                            lastName: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    id: 'desc',
                },
            }),
            prisma.payment.count({ where }),
        ]);

        return {
            payments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get payment statistics
     */
    async getPaymentStats() {
        const [total, pending, completed, failed] = await Promise.all([
            prisma.payment.count(),
            prisma.payment.count({ where: { status: 'PENDING' } }),
            prisma.payment.count({ where: { status: 'COMPLETED' } }),
            prisma.payment.count({ where: { status: 'FAILED' } }),
        ]);

        const totalRevenue = await prisma.payment.aggregate({
            where: {
                status: 'COMPLETED',
                amount: { gt: 0 }, // Exclude refunds
            },
            _sum: {
                amount: true,
            },
        });

        const totalRefunds = await prisma.payment.aggregate({
            where: {
                status: 'COMPLETED',
                amount: { lt: 0 }, // Only refunds
            },
            _sum: {
                amount: true,
            },
        });

        return {
            total,
            byStatus: {
                pending,
                completed,
                failed,
            },
            totalRevenue: totalRevenue._sum.amount || 0,
            totalRefunds: Math.abs(Number(totalRefunds._sum.amount || 0)),
        };
    }
}
