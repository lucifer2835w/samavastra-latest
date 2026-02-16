import { prisma } from '../../../config/db';
import { Prisma } from '../../../generated/prisma/client';

export class OrderService {
    /**
     * Create a new order for a student
     */
    async createOrder(data: {
        studentId: number;
        items: Array<{
            productId: number;
            quantity: number;
        }>;
    }) {
        return await prisma.$transaction(async (tx) => {
            // Calculate total amount
            let totalAmount = 0;
            const orderItems: Array<{
                productId: number;
                quantity: number;
                unitPrice: number;
            }> = [];

            for (const item of data.items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                });

                if (!product) {
                    throw new Error(`Product ${item.productId} not found`);
                }

                if (!product.isActive) {
                    throw new Error(`Product ${product.name} is not available`);
                }

                const unitPrice = Number(product.price);
                totalAmount += unitPrice * item.quantity;

                orderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice,
                });
            }

            // Create the order
            const order = await tx.order.create({
                data: {
                    studentId: data.studentId,
                    status: 'PENDING',
                    totalAmount,
                    items: {
                        create: orderItems,
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
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
            });

            // Update inventory
            for (const item of orderItems) {
                const inventory = await tx.inventory.findUnique({
                    where: { productId: item.productId },
                });

                if (inventory) {
                    await tx.inventory.update({
                        where: { productId: item.productId },
                        data: {
                            quantityOnHand: {
                                decrement: item.quantity,
                            },
                        },
                    });
                }
            }

            return order;
        });
    }

    /**
     * Get order by ID
     */
    async getOrderById(id: number) {
        return await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
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
                payments: true,
                logistics: true,
            },
        });
    }

    /**
     * Get all orders with pagination and filtering
     */
    async getAllOrders(
        page: number = 1,
        limit: number = 20,
        status?: string,
        studentId?: number
    ) {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (studentId) {
            where.studentId = studentId;
        }

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                skip,
                take: limit,
                where,
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
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
                    payments: true,
                    logistics: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.order.count({ where }),
        ]);

        return {
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Update order status
     */
    async updateOrderStatus(id: number, status: string) {
        return await prisma.order.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
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
                payments: true,
                logistics: true,
            },
        });
    }

    /**
     * Cancel an order
     */
    async cancelOrder(id: number) {
        return await prisma.$transaction(async (tx) => {
            const order = await tx.order.findUnique({
                where: { id },
                include: {
                    items: true,
                },
            });

            if (!order) {
                throw new Error('Order not found');
            }

            if (order.status === 'COMPLETED' || order.status === 'CANCELLED') {
                throw new Error(`Cannot cancel order with status: ${order.status}`);
            }

            // Restore inventory
            for (const item of order.items) {
                const inventory = await tx.inventory.findUnique({
                    where: { productId: item.productId },
                });

                if (inventory) {
                    await tx.inventory.update({
                        where: { productId: item.productId },
                        data: {
                            quantityOnHand: {
                                increment: item.quantity,
                            },
                        },
                    });
                }
            }

            // Update order status
            return await tx.order.update({
                where: { id },
                data: { status: 'CANCELLED' },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
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
            });
        });
    }

    /**
     * Get order statistics
     */
    async getOrderStats() {
        const [total, pending, processing, completed, cancelled] = await Promise.all([
            prisma.order.count(),
            prisma.order.count({ where: { status: 'PENDING' } }),
            prisma.order.count({ where: { status: 'PROCESSING' } }),
            prisma.order.count({ where: { status: 'COMPLETED' } }),
            prisma.order.count({ where: { status: 'CANCELLED' } }),
        ]);

        const totalRevenue = await prisma.order.aggregate({
            where: { status: 'COMPLETED' },
            _sum: {
                totalAmount: true,
            },
        });

        return {
            total,
            byStatus: {
                pending,
                processing,
                completed,
                cancelled,
            },
            totalRevenue: totalRevenue._sum.totalAmount || 0,
        };
    }
}
