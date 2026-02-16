export declare class InventoryService {
    getAllInventory(page?: number, limit?: number, lowStock?: boolean): Promise<{
        inventory: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getInventoryByProductId(productId: string): Promise<any>;
    updateInventory(productId: string, data: {
        quantityOnHand?: number;
        reorderLevel?: number;
        location?: string;
    }): Promise<any>;
    adjustInventory(productId: string, adjustment: number, notes?: string): Promise<any>;
    getLowStockItems(): Promise<any[]>;
    getInventoryStats(): Promise<{
        totalProducts: number;
        lowStockCount: number;
        outOfStock: number;
        totalValue: number;
    }>;
}
//# sourceMappingURL=inventory.service.d.ts.map