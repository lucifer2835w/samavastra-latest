"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const firebase_1 = require("../../../config/firebase");
class InventoryService {
    async getAllInventory(page = 1, limit = 20, lowStock = false) {
        const snap = await firebase_1.db.collection('inventory').get();
        let allInventory = [];
        for (const doc of snap.docs) {
            const inv = { id: doc.id, ...doc.data() };
            // Fetch product
            if (inv.productId) {
                const productDoc = await firebase_1.db.collection('products').doc(inv.productId).get();
                inv.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            }
            if (lowStock) {
                if (inv.quantityOnHand <= inv.reorderLevel) {
                    allInventory.push(inv);
                }
            }
            else {
                allInventory.push(inv);
            }
        }
        // Sort by product name
        allInventory.sort((a, b) => {
            var _a, _b;
            const aName = ((_a = a.product) === null || _a === void 0 ? void 0 : _a.name) || '';
            const bName = ((_b = b.product) === null || _b === void 0 ? void 0 : _b.name) || '';
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
    async getInventoryByProductId(productId) {
        const snap = await firebase_1.db.collection('inventory').where('productId', '==', productId).limit(1).get();
        if (snap.empty)
            return null;
        const doc = snap.docs[0];
        const inv = { id: doc.id, ...doc.data() };
        const productDoc = await firebase_1.db.collection('products').doc(productId).get();
        inv.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
        return inv;
    }
    async updateInventory(productId, data) {
        const snap = await firebase_1.db.collection('inventory').where('productId', '==', productId).limit(1).get();
        if (snap.empty)
            throw new Error('Inventory not found for this product');
        const docRef = snap.docs[0].ref;
        const updateData = {};
        if (data.quantityOnHand !== undefined)
            updateData.quantityOnHand = data.quantityOnHand;
        if (data.reorderLevel !== undefined)
            updateData.reorderLevel = data.reorderLevel;
        if (data.location !== undefined)
            updateData.location = data.location;
        await docRef.update(updateData);
        const updated = await docRef.get();
        const inv = { id: updated.id, ...updated.data() };
        const productDoc = await firebase_1.db.collection('products').doc(productId).get();
        inv.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
        return inv;
    }
    async adjustInventory(productId, adjustment, notes) {
        const snap = await firebase_1.db.collection('inventory').where('productId', '==', productId).limit(1).get();
        if (snap.empty)
            throw new Error('Inventory not found for this product');
        const doc = snap.docs[0];
        const inv = doc.data();
        const newQuantity = (inv.quantityOnHand || 0) + adjustment;
        if (newQuantity < 0) {
            throw new Error('Insufficient inventory. Cannot reduce below zero.');
        }
        await doc.ref.update({ quantityOnHand: newQuantity });
        const updated = await doc.ref.get();
        const result = { id: updated.id, ...updated.data() };
        const productDoc = await firebase_1.db.collection('products').doc(productId).get();
        result.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
        return result;
    }
    async getLowStockItems() {
        const snap = await firebase_1.db.collection('inventory').get();
        const items = [];
        for (const doc of snap.docs) {
            const inv = doc.data();
            if (inv.quantityOnHand <= inv.reorderLevel) {
                const item = { id: doc.id, ...inv };
                const productDoc = await firebase_1.db.collection('products').doc(inv.productId).get();
                item.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
                items.push(item);
            }
        }
        items.sort((a, b) => (a.quantityOnHand || 0) - (b.quantityOnHand || 0));
        return items;
    }
    async getInventoryStats() {
        const snap = await firebase_1.db.collection('inventory').get();
        let totalProducts = 0;
        let lowStockCount = 0;
        let outOfStock = 0;
        let totalValue = 0;
        for (const doc of snap.docs) {
            const inv = doc.data();
            totalProducts++;
            if (inv.quantityOnHand <= inv.reorderLevel)
                lowStockCount++;
            if (inv.quantityOnHand === 0)
                outOfStock++;
            // Calculate total value
            if (inv.productId) {
                const productDoc = await firebase_1.db.collection('products').doc(inv.productId).get();
                if (productDoc.exists) {
                    const price = Number(productDoc.data().price || 0);
                    totalValue += inv.quantityOnHand * price;
                }
            }
        }
        return { totalProducts, lowStockCount, outOfStock, totalValue };
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map