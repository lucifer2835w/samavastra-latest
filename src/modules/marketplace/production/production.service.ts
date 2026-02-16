import { prisma } from '../../../config/db';
import { Prisma } from '../../../generated/prisma/client';

export class ProductionService {
    /**
     * Get all production logs with pagination
     */
    async getAllLogs(page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const [logs, total] = await Promise.all([
            prisma.productionLog.findMany({
                skip,
                take: limit,
                include: {
                    product: true,
                    department: true,
                },
                orderBy: {
                    timestamp: 'desc',
                },
            }),
            prisma.productionLog.count(),
        ]);

        return {
            logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Create a new production log
     */
    async createLog(data: {
        productId: number;
        departmentId?: number;
        batchNumber: string;
        quantityProduced: number;
        notes?: string;
    }) {
        // Use a transaction to update inventory as well
        return await prisma.$transaction(async (tx) => {
            const log = await tx.productionLog.create({
                data: {
                    productId: data.productId,
                    departmentId: data.departmentId ?? null,
                    batchNumber: data.batchNumber,
                    quantityProduced: data.quantityProduced,
                    notes: data.notes ?? null,
                },
                include: {
                    product: true,
                    department: true,
                },
            });

            // Update inventory
            // Check if inventory record adheres exists
            const inventory = await tx.inventory.findUnique({
                where: { productId: data.productId },
            });

            if (inventory) {
                await tx.inventory.update({
                    where: { productId: data.productId },
                    data: {
                        quantityOnHand: {
                            increment: data.quantityProduced,
                        },
                    },
                });
            } else {
                // Create inventory record if not exists
                await tx.inventory.create({
                    data: {
                        productId: data.productId,
                        quantityOnHand: data.quantityProduced,
                        location: 'Warehouse A', // Default
                    },
                });
            }

            return log;
        });
    }

    /**
     * Get production stats
     */
    async getStats() {
        const [totalLogs, totalQuantity] = await Promise.all([
            prisma.productionLog.count(),
            prisma.productionLog.aggregate({
                _sum: {
                    quantityProduced: true,
                },
            }),
        ]);

        // Get recent logs (last 5)
        const recentLogs = await prisma.productionLog.findMany({
            take: 5,
            orderBy: {
                timestamp: 'desc',
            },
            include: {
                product: true,
            },
        });

        return {
            totalLogs,
            totalQuantity: totalQuantity._sum.quantityProduced || 0,
            recentLogs,
        };
    }
}
