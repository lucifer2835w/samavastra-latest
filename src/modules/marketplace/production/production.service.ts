import { db } from '../../../config/firebase';

export class ProductionService {
    async getAllLogs(page: number = 1, limit: number = 20) {
        const snap = await db.collection('productionLogs')
            .orderBy('timestamp', 'desc')
            .get();

        const allLogs: any[] = [];
        for (const doc of snap.docs) {
            const log = { id: doc.id, ...doc.data() } as any;

            // Fetch product
            if (log.productId) {
                const productDoc = await db.collection('products').doc(log.productId).get();
                log.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            }

            // Fetch department
            if (log.departmentId) {
                const deptDoc = await db.collection('departments').doc(log.departmentId).get();
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

    async createLog(data: {
        productId: string;
        departmentId?: string;
        batchNumber: string;
        quantityProduced: number;
        notes?: string;
    }) {
        return await db.runTransaction(async (transaction) => {
            // Create the log
            const logRef = db.collection('productionLogs').doc();
            transaction.set(logRef, {
                productId: data.productId,
                departmentId: data.departmentId || null,
                batchNumber: data.batchNumber,
                quantityProduced: data.quantityProduced,
                timestamp: new Date(),
                notes: data.notes || null,
            });

            // Update inventory
            const invSnap = await transaction.get(
                db.collection('inventory').where('productId', '==', data.productId).limit(1)
            );

            if (!invSnap.empty) {
                const invDoc = invSnap.docs[0];
                const currentQty = invDoc.data().quantityOnHand || 0;
                transaction.update(invDoc.ref, {
                    quantityOnHand: currentQty + data.quantityProduced,
                });
            } else {
                // Create inventory record
                const invRef = db.collection('inventory').doc();
                transaction.set(invRef, {
                    productId: data.productId,
                    quantityOnHand: data.quantityProduced,
                    location: 'Warehouse A',
                    reorderLevel: 0,
                });
            }

            // Fetch related data for response
            const productDoc = await transaction.get(db.collection('products').doc(data.productId));
            const product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;

            let department = null;
            if (data.departmentId) {
                const deptDoc = await transaction.get(db.collection('departments').doc(data.departmentId));
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
        const snap = await db.collection('productionLogs').get();
        let totalLogs = 0;
        let totalQuantity = 0;

        snap.docs.forEach(doc => {
            totalLogs++;
            totalQuantity += Number(doc.data().quantityProduced || 0);
        });

        // Get recent logs (last 5)
        const recentSnap = await db.collection('productionLogs')
            .orderBy('timestamp', 'desc')
            .limit(5)
            .get();

        const recentLogs: any[] = [];
        for (const doc of recentSnap.docs) {
            const log = { id: doc.id, ...doc.data() } as any;
            if (log.productId) {
                const productDoc = await db.collection('products').doc(log.productId).get();
                log.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            }
            recentLogs.push(log);
        }

        return { totalLogs, totalQuantity, recentLogs };
    }
}
