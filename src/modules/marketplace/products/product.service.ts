import { db } from '../../../config/firebase';

export class ProductService {
    async getAllProducts(page: number = 1, limit: number = 20, activeOnly: boolean = true) {
        let query: FirebaseFirestore.Query = db.collection('products');
        if (activeOnly) {
            query = query.where('isActive', '==', true);
        }
        query = query.orderBy('name', 'asc');

        const snap = await query.get();
        const allProducts: any[] = [];

        for (const doc of snap.docs) {
            const product = { id: doc.id, ...doc.data() } as any;
            // Fetch inventory
            const invSnap = await db.collection('inventory').where('productId', '==', doc.id).limit(1).get();
            product.inventory = invSnap.empty ? null : { id: invSnap.docs[0].id, ...invSnap.docs[0].data() };
            allProducts.push(product);
        }

        const total = allProducts.length;
        const start = (page - 1) * limit;
        const products = allProducts.slice(start, start + limit);

        return {
            products,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async getProductById(id: string) {
        const doc = await db.collection('products').doc(id).get();
        if (!doc.exists) return null;
        const product = { id: doc.id, ...doc.data() } as any;

        // Fetch inventory
        const invSnap = await db.collection('inventory').where('productId', '==', id).limit(1).get();
        product.inventory = invSnap.empty ? null : { id: invSnap.docs[0].id, ...invSnap.docs[0].data() };

        // Fetch recent production logs
        const prodSnap = await db.collection('productionLogs')
            .where('productId', '==', id)
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get();
        product.production = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        return product;
    }

    async getProductBySku(sku: string) {
        const snap = await db.collection('products').where('sku', '==', sku).limit(1).get();
        if (snap.empty) return null;

        const doc = snap.docs[0];
        const product = { id: doc.id, ...doc.data() } as any;

        const invSnap = await db.collection('inventory').where('productId', '==', doc.id).limit(1).get();
        product.inventory = invSnap.empty ? null : { id: invSnap.docs[0].id, ...invSnap.docs[0].data() };

        return product;
    }

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
            return await db.runTransaction(async (transaction) => {
                console.log('Creating product record...');
                const productRef = db.collection('products').doc();
                transaction.set(productRef, {
                    sku: data.sku,
                    name: data.name,
                    description: data.description || null,
                    price: data.price,
                    isActive: data.isActive ?? true,
                });

                let inventory = null;
                if (data.initialInventory) {
                    console.log('Creating inventory record with:', data.initialInventory);
                    const invRef = db.collection('inventory').doc();
                    transaction.set(invRef, {
                        productId: productRef.id,
                        location: data.initialInventory.location || null,
                        quantityOnHand: data.initialInventory.quantityOnHand,
                        reorderLevel: data.initialInventory.reorderLevel,
                    });
                    inventory = {
                        id: invRef.id,
                        productId: productRef.id,
                        location: data.initialInventory.location || null,
                        quantityOnHand: data.initialInventory.quantityOnHand,
                        reorderLevel: data.initialInventory.reorderLevel,
                    };
                }

                return {
                    id: productRef.id,
                    sku: data.sku,
                    name: data.name,
                    description: data.description || null,
                    price: data.price,
                    isActive: data.isActive ?? true,
                    inventory,
                };
            });
        } catch (error) {
            console.error('Error in ProductService.createProduct:', error);
            throw error;
        }
    }

    async updateProduct(
        id: string,
        data: {
            name?: string;
            description?: string;
            price?: number;
            isActive?: boolean;
        }
    ) {
        const docRef = db.collection('products').doc(id);
        const updateData: any = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.price !== undefined) updateData.price = data.price;
        if (data.isActive !== undefined) updateData.isActive = data.isActive;

        await docRef.update(updateData);
        const doc = await docRef.get();
        const product = { id: doc.id, ...doc.data() } as any;

        const invSnap = await db.collection('inventory').where('productId', '==', id).limit(1).get();
        product.inventory = invSnap.empty ? null : { id: invSnap.docs[0].id, ...invSnap.docs[0].data() };

        return product;
    }

    async searchProducts(query: string) {
        // Firestore doesn't have full-text search, so we fetch all and filter in memory
        const snap = await db.collection('products').get();
        const lowerQuery = query.toLowerCase();

        const results: any[] = [];
        for (const doc of snap.docs) {
            const product = doc.data();
            if (
                (product.sku || '').toLowerCase().includes(lowerQuery) ||
                (product.name || '').toLowerCase().includes(lowerQuery) ||
                (product.description || '').toLowerCase().includes(lowerQuery)
            ) {
                const p = { id: doc.id, ...product } as any;
                const invSnap = await db.collection('inventory').where('productId', '==', doc.id).limit(1).get();
                p.inventory = invSnap.empty ? null : { id: invSnap.docs[0].id, ...invSnap.docs[0].data() };
                results.push(p);
            }
            if (results.length >= 20) break;
        }

        return results;
    }
}
