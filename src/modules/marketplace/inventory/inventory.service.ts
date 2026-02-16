import { prisma } from '../../../config/db';
import { Prisma } from '../../../generated/prisma/client';
export class InventoryService {
    /**
     * Get all inventory with pagination
     */
    async getAllInventory(page: number = 1, limit: number = 20, lowStock: boolean = false) {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (lowStock) {
            where.quantityOnHand = {
                lte: prisma.inventory.fields.reorderLevel,
            };
        }

        const [inventory, total] = await Promise.all([
            prisma.inventory.findMany({
                skip,
                take: limit,
                where,
                include: {
                    product: true,
                },
                orderBy: {
                    product: {
                        name: 'asc',
                    },
                },
            }),
            prisma.inventory.count({ where }),
        ]);

        return {
            inventory,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get inventory for a specific product
     */
    async getInventoryByProductId(productId: number) {
        return await prisma.inventory.findUnique({
            where: { productId },
            include: {
                product: true,
            },
        });
    }

    /**
     * Update inventory levels
     */
    async updateInventory(
        productId: number,
        data: {
            quantityOnHand?: number;
            reorderLevel?: number;
            location?: string;
        }
    ) {
        return await prisma.inventory.update({
            where: { productId },
            data,
            include: {
                product: true,
            },
        });
    }

    /**
     * Adjust inventory (add or remove stock)
     */
    async adjustInventory(productId: number, adjustment: number, notes?: string) {
        const inventory = await prisma.inventory.findUnique({
            where: { productId },
            include: { product: true },
        });

        if (!inventory) {
            throw new Error('Inventory not found for this product');
        }

        const newQuantity = inventory.quantityOnHand + adjustment;

        if (newQuantity < 0) {
            throw new Error('Insufficient inventory. Cannot reduce below zero.');
        }

        return await prisma.inventory.update({
            where: { productId },
            data: {
                quantityOnHand: newQuantity,
            },
            include: {
                product: true,
            },
        });
    }

    /**
     * Get low stock items
     */
    async getLowStockItems() {
        const items = await prisma.inventory.findMany({
            where: {
                quantityOnHand: {
                    lte: prisma.inventory.fields.reorderLevel,
                },
            },
            include: {
                product: true,
            },
            orderBy: {
                quantityOnHand: 'asc',
            },
        });

        return items;
    }

    /**
     * Get inventory statistics
     */
    async getInventoryStats() {
        const [totalProducts, lowStockCount, outOfStock] = await Promise.all([
            prisma.inventory.count(),
            prisma.inventory.count({
                where: {
                    quantityOnHand: {
                        lte: prisma.inventory.fields.reorderLevel,
                    },
                },
            }),
            prisma.inventory.count({
                where: {
                    quantityOnHand: 0,
                },
            }),
        ]);

        const totalValue = await prisma.$queryRaw<Array<{ total: number }>>`
      SELECT SUM(i."quantityOnHand" * p.price::numeric) as total
      FROM "Inventory" i
      JOIN "Product" p ON i."productId" = p.id
    `;

        return {
            totalProducts,
            lowStockCount,
            outOfStock,
            totalValue: totalValue[0]?.total || 0,
        };
    }
}
