"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogisticsService = void 0;
const firebase_1 = require("../../../config/firebase");
// Helper
async function fetchOrderWithStudent(orderId) {
    const doc = await firebase_1.db.collection('orders').doc(orderId).get();
    if (!doc.exists)
        return null;
    const order = { id: doc.id, ...doc.data() };
    if (order.studentId) {
        const studentDoc = await firebase_1.db.collection('students').doc(order.studentId).get();
        if (studentDoc.exists) {
            order.student = { id: studentDoc.id, ...studentDoc.data() };
            if (order.student.userId) {
                const userDoc = await firebase_1.db.collection('users').doc(order.student.userId).get();
                if (userDoc.exists) {
                    order.student.user = {
                        firstName: userDoc.data().firstName,
                        lastName: userDoc.data().lastName,
                        email: userDoc.data().email,
                    };
                }
            }
        }
        // Fetch items
        const itemsSnap = await firebase_1.db.collection('orderItems').where('orderId', '==', orderId).get();
        order.items = [];
        for (const itemDoc of itemsSnap.docs) {
            const item = { id: itemDoc.id, ...itemDoc.data() };
            const productDoc = await firebase_1.db.collection('products').doc(item.productId).get();
            item.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            order.items.push(item);
        }
    }
    return order;
}
class LogisticsService {
    async createTracking(data) {
        const docRef = await firebase_1.db.collection('logisticsTracking').add({
            orderId: data.orderId,
            trackingNumber: data.trackingNumber,
            status: data.status,
            estimatedDelivery: data.estimatedDelivery || null,
            actualDelivery: null,
        });
        const doc = await docRef.get();
        const tracking = { id: doc.id, ...doc.data() };
        tracking.order = await fetchOrderWithStudent(data.orderId);
        return tracking;
    }
    async getTrackingById(id) {
        const doc = await firebase_1.db.collection('logisticsTracking').doc(id).get();
        if (!doc.exists)
            return null;
        const tracking = { id: doc.id, ...doc.data() };
        if (tracking.orderId) {
            tracking.order = await fetchOrderWithStudent(tracking.orderId);
        }
        return tracking;
    }
    async getTrackingByNumber(trackingNumber) {
        const snap = await firebase_1.db.collection('logisticsTracking')
            .where('trackingNumber', '==', trackingNumber)
            .limit(1)
            .get();
        if (snap.empty)
            return null;
        const doc = snap.docs[0];
        const tracking = { id: doc.id, ...doc.data() };
        if (tracking.orderId) {
            tracking.order = await fetchOrderWithStudent(tracking.orderId);
        }
        return tracking;
    }
    async getTrackingByOrderId(orderId) {
        const snap = await firebase_1.db.collection('logisticsTracking')
            .where('orderId', '==', orderId)
            .get();
        const results = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by descending
        results.sort((a, b) => {
            // Newest first
            return 0; // order by id in Firestore doesn't help, just return as-is
        });
        return results;
    }
    async updateTracking(id, data) {
        const docRef = firebase_1.db.collection('logisticsTracking').doc(id);
        const updateData = {};
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.estimatedDelivery !== undefined)
            updateData.estimatedDelivery = data.estimatedDelivery;
        if (data.actualDelivery !== undefined)
            updateData.actualDelivery = data.actualDelivery;
        await docRef.update(updateData);
        const doc = await docRef.get();
        const tracking = { id: doc.id, ...doc.data() };
        if (tracking.orderId) {
            tracking.order = await fetchOrderWithStudent(tracking.orderId);
        }
        return tracking;
    }
    async markAsDelivered(id) {
        return await firebase_1.db.runTransaction(async (transaction) => {
            const trackingDoc = await transaction.get(firebase_1.db.collection('logisticsTracking').doc(id));
            if (!trackingDoc.exists)
                throw new Error('Tracking not found');
            const trackingData = trackingDoc.data();
            transaction.update(trackingDoc.ref, {
                status: 'DELIVERED',
                actualDelivery: new Date(),
            });
            // Update order status
            if (trackingData.orderId) {
                const orderRef = firebase_1.db.collection('orders').doc(trackingData.orderId);
                transaction.update(orderRef, { status: 'COMPLETED', updatedAt: new Date() });
            }
            return {
                id: trackingDoc.id,
                ...trackingData,
                status: 'DELIVERED',
                actualDelivery: new Date(),
            };
        });
    }
    async getAllTracking(page = 1, limit = 20, status) {
        let query = firebase_1.db.collection('logisticsTracking');
        if (status) {
            query = query.where('status', '==', status);
        }
        const snap = await query.get();
        const allTracking = [];
        for (const doc of snap.docs) {
            const tracking = { id: doc.id, ...doc.data() };
            if (tracking.orderId) {
                tracking.order = await fetchOrderWithStudent(tracking.orderId);
            }
            allTracking.push(tracking);
        }
        const total = allTracking.length;
        const start = (page - 1) * limit;
        const trackingList = allTracking.slice(start, start + limit);
        return {
            tracking: trackingList,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }
    async getLogisticsStats() {
        const snap = await firebase_1.db.collection('logisticsTracking').get();
        let total = 0, inTransit = 0, delivered = 0, pending = 0;
        snap.docs.forEach(doc => {
            const data = doc.data();
            total++;
            switch (data.status) {
                case 'IN_TRANSIT':
                    inTransit++;
                    break;
                case 'DELIVERED':
                    delivered++;
                    break;
                case 'PENDING':
                    pending++;
                    break;
            }
        });
        return {
            total,
            byStatus: { pending, inTransit, delivered },
        };
    }
}
exports.LogisticsService = LogisticsService;
//# sourceMappingURL=logistics.service.js.map