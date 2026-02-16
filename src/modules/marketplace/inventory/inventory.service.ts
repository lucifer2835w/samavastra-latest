import { db } from '../../../config/firebase';

export class InventoryService {
    async getAllInventory(page: number = 1, limit: number = 20, lowStock: boolean = false) {
        const snap = await db.collection('inventory').get();
        let allInventory: any[] = [];

        for (const doc of snap.docs) {
            const inv = { id: doc.id, ...doc.data() } as any;

            // Fetch product
            if (inv.productId) {
                const productDoc = await db.collection('products').doc(inv.productId).get();
                inv.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            }

            if (lowStock) {
                if (inv.quantityOnHand <= inv.reorderLevel) {
                    allInventory.push(inv);
                }
            } else {
                allInventory.push(inv);
            }
        }

        // Sort by product name
        allInventory.sort((a, b) => {
            const aName = a.product?.name || '';
            const bName = b.product?.name || '';
            return aName.localeCompare(bName);
        });

        const total = allInventory.length;
        const start = (page - 1) * limit;
        const inventory = allInventory.slice(start, start + limit);

        return {
            inventory,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async getInventoryByProductId(productId: string) {
        const snap = await db.collection('inventory').where('productId', '==', productId).limit(1).get();
        if (snap.empty) return null;

        const doc = snap.docs[0];
        const inv = { id: doc.id, ...doc.data() } as any;

        const productDoc = await db.collection('products').doc(productId).get();
        inv.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;

        return inv;
    }

    async updateInventory(
        productId: string,
        data: {
            quantityOnHand?: number;
            reorderLevel?: number;
            location?: string;
        }
    ) {
        const snap = await db.collection('inventory').where('productId', '==', productId).limit(1).get();
        if (snap.empty) throw new Error('Inventory not found for this product');

        const docRef = snap.docs[0].ref;
        const updateData: any = {};
        if (data.quantityOnHand !== undefined) updateData.quantityOnHand = data.quantityOnHand;
        if (data.reorderLevel !== undefined) updateData.reorderLevel = data.reorderLevel;
        if (data.location !== undefined) updateData.location = data.location;

        await docRef.update(updateData);
        const updated = await docRef.get();
        const inv = { id: updated.id, ...updated.data() } as any;

        const productDoc = await db.collection('products').doc(productId).get();
        inv.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;

        return inv;
    }

    async adjustInventory(productId: string, adjustment: number, notes?: string) {
        const snap = await db.collection('inventory').where('productId', '==', productId).limit(1).get();
        if (snap.empty) throw new Error('Inventory not found for this product');

        const doc = snap.docs[0];
        const inv = doc.data();
        const newQuantity = (inv.quantityOnHand || 0) + adjustment;

        if (newQuantity < 0) {
            throw new Error('Insufficient inventory. Cannot reduce below zero.');
        }

        await doc.ref.update({ quantityOnHand: newQuantity });
        const updated = await doc.ref.get();
        const result = { id: updated.id, ...updated.data() } as any;

        const productDoc = await db.collection('products').doc(productId).get();
        result.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;

        return result;
    }

    async getLowStockItems() {
        const snap = await db.collection('inventory').get();
        const items: any[] = [];

        for (const doc of snap.docs) {
            const inv = doc.data();
            if (inv.quantityOnHand <= inv.reorderLevel) {
                const item = { id: doc.id, ...inv } as any;
                const productDoc = await db.collection('products').doc(inv.productId).get();
                item.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
                items.push(item);
            }
        }

        items.sort((a, b) => (a.quantityOnHand || 0) - (b.quantityOnHand || 0));
        return items;
    }

    async getInventoryStats() {
        const snap = await db.collection('inventory').get();
        let totalProducts = 0;
        let lowStockCount = 0;
        let outOfStock = 0;
        let totalValue = 0;

        for (const doc of snap.docs) {
            const inv = doc.data();
            totalProducts++;

            if (inv.quantityOnHand <= inv.reorderLevel) lowStockCount++;
            if (inv.quantityOnHand === 0) outOfStock++;

            // Calculate total value
            if (inv.productId) {
                const productDoc = await db.collection('products').doc(inv.productId).get();
                if (productDoc.exists) {
                    const price = Number(productDoc.data()!.price || 0);
                    totalValue += inv.quantityOnHand * price;
                }
            }
        }

        return { totalProducts, lowStockCount, outOfStock, totalValue };
    }
}
