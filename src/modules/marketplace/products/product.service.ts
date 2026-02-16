import { prisma } from '../../../config/db';
import { Prisma } from '../../../generated/prisma/client';

export class ProductService {
    /**
     * Get all products with pagination and filtering
     */
    async getAllProducts(page: number = 1, limit: number = 20, activeOnly: boolean = true) {
        const skip = (page - 1) * limit;
        const where = activeOnly ? { isActive: true } : {};

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                skip,
                take: limit,
                where,
                include: {
                    inventory: true,
                },
                orderBy: {
                    name: 'asc',
                },
            }),
            prisma.product.count({ where }),
        ]);

        return {
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get product by ID
     */
    async getProductById(id: number) {
        return await prisma.product.findUnique({
            where: { id },
            include: {
                inventory: true,
                production: {
                    orderBy: {
                        timestamp: 'desc',
                    },
                    take: 10,
                },
            },
        });
    }

    /**
     * Get product by SKU
     */
    async getProductBySku(sku: string) {
        return await prisma.product.findUnique({
            where: { sku },
            include: {
                inventory: true,
            },
        });
    }

    /**
     * Create new product
     */
    async createProduct(data: {
        sku: string;
        name: string;
        description?: string;
        price: number;
        isActive?: boolean;
        initialInventory?: {
            location?: string;
            quantityOnHand: number;
            reorderLevel: number;
        };
    }) {
        console.log('ProductService.createProduct called with:', data);
        try {
            return await prisma.$transaction(async (tx) => {
                console.log('Creating product record...');
                const product = await tx.product.create({
                    data: {
                        sku: data.sku,
                        name: data.name,
                        description: data.description ?? null,
                        price: data.price,
                        isActive: data.isActive ?? true,
                    },
                });
                console.log('Product created:', product.id);

                if (data.initialInventory) {
                    console.log('Creating inventory record with:', data.initialInventory);
                    await tx.inventory.create({
                        data: {
                            productId: product.id,
                            location: data.initialInventory.location ?? null,
                            quantityOnHand: data.initialInventory.quantityOnHand,
                            reorderLevel: data.initialInventory.reorderLevel,
                        },
                    });
                    console.log('Inventory created');
                }

                return await tx.product.findUnique({
                    where: { id: product.id },
                    include: { inventory: true },
                });
            });
        } catch (error) {
            console.error('Error in ProductService.createProduct:', error);
            throw error;
        }
    }

    /**
     * Update product
     */
    async updateProduct(
        id: number,
        data: {
            name?: string;
            description?: string;
            price?: number;
            isActive?: boolean;
        }
    ) {
        return await prisma.product.update({
            where: { id },
            data,
            include: {
                inventory: true,
            },
        });
    }

    /**
     * Search products
     */
    async searchProducts(query: string) {
        return await prisma.product.findMany({
            where: {
                OR: [
                    { sku: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                inventory: true,
            },
            take: 20,
        });
    }
}
