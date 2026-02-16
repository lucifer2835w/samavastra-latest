import { db } from '../../../config/firebase';
import { FieldValue } from 'firebase-admin/firestore';

// Helper functions
async function fetchUser(userId: string) {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchStudent(studentId: string) {
    const doc = await db.collection('students').doc(studentId).get();
    if (!doc.exists) return null;
    const student = { id: doc.id, ...doc.data() } as any;
    if (student.userId) {
        const userDoc = await db.collection('users').doc(student.userId).get();
        if (userDoc.exists) {
            student.user = {
                firstName: userDoc.data()!.firstName,
                lastName: userDoc.data()!.lastName,
                email: userDoc.data()!.email,
            };
        }
    }
    return student;
}

export class OrderService {
    async createOrder(data: {
        studentId: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
    }) {
        return await db.runTransaction(async (transaction) => {
            let totalAmount = 0;
            const orderItems: Array<{
                productId: string;
                quantity: number;
                unitPrice: number;
            }> = [];

            // Validate products and calculate totals
            for (const item of data.items) {
                const productDoc = await transaction.get(db.collection('products').doc(item.productId));
                if (!productDoc.exists) {
                    throw new Error(`Product ${item.productId} not found`);
                }
                const product = productDoc.data()!;
                if (!product.isActive) {
                    throw new Error(`Product ${product.name} is not available`);
                }
                const unitPrice = Number(product.price);
                totalAmount += unitPrice * item.quantity;
                orderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice,
                });
            }

            // Create order
            const orderRef = db.collection('orders').doc();
            transaction.set(orderRef, {
                studentId: data.studentId,
                status: 'PENDING',
                totalAmount,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Create order items
            for (const item of orderItems) {
                const itemRef = db.collection('orderItems').doc();
                transaction.set(itemRef, {
                    orderId: orderRef.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                });
            }

            // Update inventory
            for (const item of orderItems) {
                const invSnap = await transaction.get(
                    db.collection('inventory').where('productId', '==', item.productId).limit(1)
                );
                if (!invSnap.empty) {
                    const invDoc = invSnap.docs[0];
                    const currentQty = invDoc.data().quantityOnHand || 0;
                    transaction.update(invDoc.ref, {
                        quantityOnHand: currentQty - item.quantity,
                    });
                }
            }

            return {
                id: orderRef.id,
                studentId: data.studentId,
                status: 'PENDING',
                totalAmount,
                items: orderItems,
                createdAt: new Date(),
            };
        });
    }

    async getOrderById(id: string) {
        const doc = await db.collection('orders').doc(id).get();
        if (!doc.exists) return null;
        const order = { id: doc.id, ...doc.data() } as any;

        // Fetch items
        const itemsSnap = await db.collection('orderItems').where('orderId', '==', id).get();
        order.items = [];
        for (const itemDoc of itemsSnap.docs) {
            const item = { id: itemDoc.id, ...itemDoc.data() } as any;
            const productDoc = await db.collection('products').doc(item.productId).get();
            item.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
            order.items.push(item);
        }

        // Fetch student
        order.student = order.studentId ? await fetchStudent(order.studentId) : null;

        // Fetch payments
        const paymentsSnap = await db.collection('payments').where('orderId', '==', id).get();
        order.payments = paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Fetch logistics
        const logSnap = await db.collection('logisticsTracking').where('orderId', '==', id).get();
        order.logistics = logSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        return order;
    }

    async getAllOrders(
        page: number = 1,
        limit: number = 20,
        status?: string,
        studentId?: string
    ) {
        let query: FirebaseFirestore.Query = db.collection('orders');
        if (status) query = query.where('status', '==', status);
        if (studentId) query = query.where('studentId', '==', studentId);
        query = query.orderBy('createdAt', 'desc');

        const snap = await query.get();
        const allOrders: any[] = [];

        for (const doc of snap.docs) {
            const order = { id: doc.id, ...doc.data() } as any;

            // Fetch items
            const itemsSnap = await db.collection('orderItems').where('orderId', '==', doc.id).get();
            order.items = [];
            for (const itemDoc of itemsSnap.docs) {
                const item = { id: itemDoc.id, ...itemDoc.data() } as any;
                const productDoc = await db.collection('products').doc(item.productId).get();
                item.product = productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
                order.items.push(item);
            }

            order.student = order.studentId ? await fetchStudent(order.studentId) : null;

            const paymentsSnap = await db.collection('payments').where('orderId', '==', doc.id).get();
            order.payments = paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

            const logSnap = await db.collection('logisticsTracking').where('orderId', '==', doc.id).get();
            order.logistics = logSnap.docs.map(d => ({ id: d.id, ...d.data() }));

            allOrders.push(order);
        }

        const total = allOrders.length;
        const start = (page - 1) * limit;
        const orders = allOrders.slice(start, start + limit);

        return {
            orders,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async updateOrderStatus(id: string, status: string) {
        const docRef = db.collection('orders').doc(id);
        await docRef.update({ status, updatedAt: new Date() });
        return this.getOrderById(id);
    }

    async cancelOrder(id: string) {
        return await db.runTransaction(async (transaction) => {
            const orderDoc = await transaction.get(db.collection('orders').doc(id));
            if (!orderDoc.exists) throw new Error('Order not found');

            const order = orderDoc.data()!;
            if (order.status === 'COMPLETED' || order.status === 'CANCELLED') {
                throw new Error(`Cannot cancel order with status: ${order.status}`);
            }

            // Get order items
            const itemsSnap = await transaction.get(
                db.collection('orderItems').where('orderId', '==', id)
            );

            // Restore inventory
            for (const itemDoc of itemsSnap.docs) {
                const item = itemDoc.data();
                const invSnap = await transaction.get(
                    db.collection('inventory').where('productId', '==', item.productId).limit(1)
                );
                if (!invSnap.empty) {
                    const invDoc = invSnap.docs[0];
                    const currentQty = invDoc.data().quantityOnHand || 0;
                    transaction.update(invDoc.ref, {
                        quantityOnHand: currentQty + item.quantity,
                    });
                }
            }

            // Update order status
            transaction.update(orderDoc.ref, { status: 'CANCELLED', updatedAt: new Date() });

            return { id, ...order, status: 'CANCELLED' };
        });
    }

    async getOrderStats() {
        const snap = await db.collection('orders').get();
        let total = 0, pending = 0, processing = 0, completed = 0, cancelled = 0;
        let totalRevenue = 0;

        snap.docs.forEach(doc => {
            const data = doc.data();
            total++;
            switch (data.status) {
                case 'PENDING': pending++; break;
                case 'PROCESSING': processing++; break;
                case 'COMPLETED':
                    completed++;
                    totalRevenue += Number(data.totalAmount || 0);
                    break;
                case 'CANCELLED': cancelled++; break;
            }
        });

        return {
            total,
            byStatus: { pending, processing, completed, cancelled },
            totalRevenue,
        };
    }
}
