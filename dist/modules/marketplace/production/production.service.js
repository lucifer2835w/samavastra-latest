"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionService = void 0;
const firebase_1 = require("../../../config/firebase");
class ProductionService {
    async getAllLogs(page = 1, limit = 20) {
        const snap = await firebase_1.db.collection('productionLogs')
            .orderBy('timestamp', 'desc')
            .get();
        const allLogs = [];
        for (const doc of snap.docs) {
            const log = { id: doc.id, ...doc.data() };
            // Fetch product
            if (log.productId) {
                const productDoc = await firebase_1.db.collection('products').doc(log.productId).get();
                log.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            }
            // Fetch department
            if (log.departmentId) {
                const deptDoc = await firebase_1.db.collection('departments').doc(log.departmentId).get();
                log.department = deptDoc.exists ? { id: deptDoc.id, ...deptDoc.data() } : null;
            }
            allLogs.push(log);
        }
        const total = allLogs.length;
        const start = (page - 1) * limit;
        const logs = allLogs.slice(start, start + limit);
        return {
            logs,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }
    async createLog(data) {
        return await firebase_1.db.runTransaction(async (transaction) => {
            // Create the log
            const logRef = firebase_1.db.collection('productionLogs').doc();
            transaction.set(logRef, {
                productId: data.productId,
                departmentId: data.departmentId || null,
                batchNumber: data.batchNumber,
                quantityProduced: data.quantityProduced,
                timestamp: new Date(),
                notes: data.notes || null,
            });
            // Update inventory
            const invSnap = await transaction.get(firebase_1.db.collection('inventory').where('productId', '==', data.productId).limit(1));
            if (!invSnap.empty) {
                const invDoc = invSnap.docs[0];
                const currentQty = invDoc.data().quantityOnHand || 0;
                transaction.update(invDoc.ref, {
                    quantityOnHand: currentQty + data.quantityProduced,
                });
            }
            else {
                // Create inventory record
                const invRef = firebase_1.db.collection('inventory').doc();
                transaction.set(invRef, {
                    productId: data.productId,
                    quantityOnHand: data.quantityProduced,
                    location: 'Warehouse A',
                    reorderLevel: 0,
                });
            }
            // Fetch related data for response
            const productDoc = await transaction.get(firebase_1.db.collection('products').doc(data.productId));
            const product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            let department = null;
            if (data.departmentId) {
                const deptDoc = await transaction.get(firebase_1.db.collection('departments').doc(data.departmentId));
                department = deptDoc.exists ? { id: deptDoc.id, ...deptDoc.data() } : null;
            }
            return {
                id: logRef.id,
                productId: data.productId,
                departmentId: data.departmentId || null,
                batchNumber: data.batchNumber,
                quantityProduced: data.quantityProduced,
                timestamp: new Date(),
                notes: data.notes || null,
                product,
                department,
            };
        });
    }
    async getStats() {
        const snap = await firebase_1.db.collection('productionLogs').get();
        let totalLogs = 0;
        let totalQuantity = 0;
        snap.docs.forEach(doc => {
            totalLogs++;
            totalQuantity += Number(doc.data().quantityProduced || 0);
        });
        // Get recent logs (last 5)
        const recentSnap = await firebase_1.db.collection('productionLogs')
            .orderBy('timestamp', 'desc')
            .limit(5)
            .get();
        const recentLogs = [];
        for (const doc of recentSnap.docs) {
            const log = { id: doc.id, ...doc.data() };
            if (log.productId) {
                const productDoc = await firebase_1.db.collection('products').doc(log.productId).get();
                log.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            }
            recentLogs.push(log);
        }
        return { totalLogs, totalQuantity, recentLogs };
    }
}
exports.ProductionService = ProductionService;
//# sourceMappingURL=production.service.js.map