export declare class ProductService {
    getAllProducts(page?: number, limit?: number, activeOnly?: boolean): Promise<{
        products: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getProductById(id: string): Promise<any>;
    getProductBySku(sku: string): Promise<any>;
    createProduct(data: {
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
    }): Promise<{
        id: string;
        sku: string;
        name: string;
        description: string;
        price: number;
        isActive: boolean;
        inventory: {
            id: string;
            productId: string;
            location: string;
            quantityOnHand: number;
            reorderLevel: number;
        };
    }>;
    updateProduct(id: string, data: {
        name?: string;
        description?: string;
        price?: number;
        isActive?: boolean;
    }): Promise<any>;
    searchProducts(query: string): Promise<any[]>;
}
//# sourceMappingURL=product.service.d.ts.map