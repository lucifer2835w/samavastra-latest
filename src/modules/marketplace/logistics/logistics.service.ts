import { prisma } from '../../../config/db';
import { Prisma } from '../../../generated/prisma/client';
export class LogisticsService {
    /**
     * Create logistics tracking for an order
     */
    async createTracking(data: {
        orderId: number;
        trackingNumber: string;
        status: string;
        estimatedDelivery?: Date;
    }) {
        return await prisma.logisticsTracking.create({
            data: {
                orderId: data.orderId,
                trackingNumber: data.trackingNumber,
                status: data.status,
                estimatedDelivery: data.estimatedDelivery ?? null,
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
     * Get tracking by ID
     */
    async getTrackingById(id: number) {
        return await prisma.logisticsTracking.findUnique({
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
     * Get tracking by tracking number
     */
    async getTrackingByNumber(trackingNumber: string) {
        return await prisma.logisticsTracking.findUnique({
            where: { trackingNumber },
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
     * Get tracking for an order
     */
    async getTrackingByOrderId(orderId: number) {
        return await prisma.logisticsTracking.findMany({
            where: { orderId },
            include: {
                order: true,
            },
            orderBy: {
                id: 'desc',
            },
        });
    }

    /**
     * Update tracking status
     */
    async updateTracking(
        id: number,
        data: {
            status?: string;
            estimatedDelivery?: Date;
            actualDelivery?: Date;
        }
    ) {
        return await prisma.logisticsTracking.update({
            where: { id },
            data,
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
     * Mark as delivered
     */
    async markAsDelivered(id: number) {
        return await prisma.$transaction(async (tx) => {
            const tracking = await tx.logisticsTracking.update({
                where: { id },
                data: {
                    status: 'DELIVERED',
                    actualDelivery: new Date(),
                },
                include: {
                    order: true,
                },
            });

            // Update order status to completed
            await tx.order.update({
                where: { id: tracking.orderId },
                data: { status: 'COMPLETED' },
            });

            return tracking;
        });
    }

    /**
     * Get all tracking records with pagination
     */
    async getAllTracking(page: number = 1, limit: number = 20, status?: string) {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (status) {
            where.status = status;
        }

        const [tracking, total] = await Promise.all([
            prisma.logisticsTracking.findMany({
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
            prisma.logisticsTracking.count({ where }),
        ]);

        return {
            tracking,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get logistics statistics
     */
    async getLogisticsStats() {
        const [total, inTransit, delivered, pending] = await Promise.all([
            prisma.logisticsTracking.count(),
            prisma.logisticsTracking.count({ where: { status: 'IN_TRANSIT' } }),
            prisma.logisticsTracking.count({ where: { status: 'DELIVERED' } }),
            prisma.logisticsTracking.count({ where: { status: 'PENDING' } }),
        ]);

        return {
            total,
            byStatus: {
                pending,
                inTransit,
                delivered,
            },
        };
    }
}
