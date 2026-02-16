import { db } from '../../../config/firebase';

// Helper
async function fetchOrderWithStudent(orderId: string) {
    const doc = await db.collection('orders').doc(orderId).get();
    if (!doc.exists) return null;
    const order = { id: doc.id, ...doc.data() } as any;
    if (order.studentId) {
        const studentDoc = await db.collection('students').doc(order.studentId).get();
        if (studentDoc.exists) {
            order.student = { id: studentDoc.id, ...studentDoc.data() } as any;
            if (order.student.userId) {
                const userDoc = await db.collection('users').doc(order.student.userId).get();
                if (userDoc.exists) {
                    order.student.user = {
                        firstName: userDoc.data()!.firstName,
                        lastName: userDoc.data()!.lastName,
                        email: userDoc.data()!.email,
                    };
                }
            }
        }
        // Fetch items
        const itemsSnap = await db.collection('orderItems').where('orderId', '==', orderId).get();
        order.items = [];
        for (const itemDoc of itemsSnap.docs) {
            const item = { id: itemDoc.id, ...itemDoc.data() } as any;
            const productDoc = await db.collection('products').doc(item.productId).get();
            item.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            order.items.push(item);
        }
    }
    return order;
}

export class LogisticsService {
    async createTracking(data: {
        orderId: string;
        trackingNumber: string;
        status: string;
        estimatedDelivery?: Date;
    }) {
        const docRef = await db.collection('logisticsTracking').add({
            orderId: data.orderId,
            trackingNumber: data.trackingNumber,
            status: data.status,
            estimatedDelivery: data.estimatedDelivery || null,
            actualDelivery: null,
        });
        const doc = await docRef.get();
        const tracking = { id: doc.id, ...doc.data() } as any;
        tracking.order = await fetchOrderWithStudent(data.orderId);
        return tracking;
    }

    async getTrackingById(id: string) {
        const doc = await db.collection('logisticsTracking').doc(id).get();
        if (!doc.exists) return null;
        const tracking = { id: doc.id, ...doc.data() } as any;
        if (tracking.orderId) {
            tracking.order = await fetchOrderWithStudent(tracking.orderId);
        }
        return tracking;
    }

    async getTrackingByNumber(trackingNumber: string) {
        const snap = await db.collection('logisticsTracking')
            .where('trackingNumber', '==', trackingNumber)
            .limit(1)
            .get();
        if (snap.empty) return null;
        const doc = snap.docs[0];
        const tracking = { id: doc.id, ...doc.data() } as any;
        if (tracking.orderId) {
            tracking.order = await fetchOrderWithStudent(tracking.orderId);
        }
        return tracking;
    }

    async getTrackingByOrderId(orderId: string) {
        const snap = await db.collection('logisticsTracking')
            .where('orderId', '==', orderId)
            .get();
        const results = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by descending
        results.sort((a: any, b: any) => {
            // Newest first
            return 0; // order by id in Firestore doesn't help, just return as-is
        });
        return results;
    }

    async updateTracking(
        id: string,
        data: {
            status?: string;
            estimatedDelivery?: Date;
            actualDelivery?: Date;
        }
    ) {
        const docRef = db.collection('logisticsTracking').doc(id);
        const updateData: any = {};
        if (data.status !== undefined) updateData.status = data.status;
        if (data.estimatedDelivery !== undefined) updateData.estimatedDelivery = data.estimatedDelivery;
        if (data.actualDelivery !== undefined) updateData.actualDelivery = data.actualDelivery;

        await docRef.update(updateData);
        const doc = await docRef.get();
        const tracking = { id: doc.id, ...doc.data() } as any;
        if (tracking.orderId) {
            tracking.order = await fetchOrderWithStudent(tracking.orderId);
        }
        return tracking;
    }

    async markAsDelivered(id: string) {
        return await db.runTransaction(async (transaction) => {
            const trackingDoc = await transaction.get(db.collection('logisticsTracking').doc(id));
            if (!trackingDoc.exists) throw new Error('Tracking not found');

            const trackingData = trackingDoc.data()!;

            transaction.update(trackingDoc.ref, {
                status: 'DELIVERED',
                actualDelivery: new Date(),
            });

            // Update order status
            if (trackingData.orderId) {
                const orderRef = db.collection('orders').doc(trackingData.orderId);
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

    async getAllTracking(page: number = 1, limit: number = 20, status?: string) {
        let query: FirebaseFirestore.Query = db.collection('logisticsTracking');
        if (status) {
            query = query.where('status', '==', status);
        }

        const snap = await query.get();
        const allTracking: any[] = [];

        for (const doc of snap.docs) {
            const tracking = { id: doc.id, ...doc.data() } as any;
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
        const snap = await db.collection('logisticsTracking').get();
        let total = 0, inTransit = 0, delivered = 0, pending = 0;

        snap.docs.forEach(doc => {
            const data = doc.data();
            total++;
            switch (data.status) {
                case 'IN_TRANSIT': inTransit++; break;
                case 'DELIVERED': delivered++; break;
                case 'PENDING': pending++; break;
            }
        });

        return {
            total,
            byStatus: { pending, inTransit, delivered },
        };
    }
}
