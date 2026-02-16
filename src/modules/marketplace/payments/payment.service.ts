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

export class PaymentService {
    async createPayment(data: {
        orderId: string;
        amount: number;
        paymentMethod: string;
        transactionReference?: string;
    }) {
        const docRef = await db.collection('payments').add({
            orderId: data.orderId,
            amount: data.amount,
            status: 'PENDING',
            paymentMethod: data.paymentMethod,
            transactionReference: data.transactionReference || null,
            paidAt: null,
        });
        const doc = await docRef.get();
        const payment = { id: doc.id, ...doc.data() } as any;
        payment.order = await fetchOrderWithStudent(data.orderId);
        return payment;
    }

    async getPaymentById(id: string) {
        const doc = await db.collection('payments').doc(id).get();
        if (!doc.exists) return null;
        const payment = { id: doc.id, ...doc.data() } as any;
        if (payment.orderId) {
            payment.order = await fetchOrderWithStudent(payment.orderId);
        }
        return payment;
    }

    async getPaymentsByOrderId(orderId: string) {
        const snap = await db.collection('payments')
            .where('orderId', '==', orderId)
            .get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async updatePaymentStatus(
        id: string,
        status: string,
        transactionReference?: string
    ) {
        return await db.runTransaction(async (transaction) => {
            const paymentDoc = await transaction.get(db.collection('payments').doc(id));
            if (!paymentDoc.exists) throw new Error('Payment not found');

            const updateData: any = { status };
            if (status === 'COMPLETED') {
                updateData.paidAt = new Date();
            }
            if (transactionReference) {
                updateData.transactionReference = transactionReference;
            }

            transaction.update(paymentDoc.ref, updateData);

            const paymentData = paymentDoc.data()!;

            // If payment is completed, check if order should be updated
            if (status === 'COMPLETED' && paymentData.orderId) {
                const paymentsSnap = await transaction.get(
                    db.collection('payments').where('orderId', '==', paymentData.orderId)
                );

                let totalPaid = 0;
                paymentsSnap.docs.forEach(pDoc => {
                    const p = pDoc.data();
                    if (p.status === 'COMPLETED' || pDoc.id === id) {
                        totalPaid += Number(p.amount || 0);
                    }
                });

                const orderDoc = await transaction.get(
                    db.collection('orders').doc(paymentData.orderId)
                );

                if (orderDoc.exists && totalPaid >= Number(orderDoc.data()!.totalAmount)) {
                    transaction.update(orderDoc.ref, { status: 'PROCESSING', updatedAt: new Date() });
                }
            }

            return {
                id: paymentDoc.id,
                ...paymentData,
                ...updateData,
            };
        });
    }

    async processRefund(orderId: string, amount: number, reason?: string) {
        const docRef = await db.collection('payments').add({
            orderId,
            amount: -Math.abs(amount),
            status: 'COMPLETED',
            paymentMethod: 'REFUND',
            transactionReference: `REFUND-${Date.now()}`,
            paidAt: new Date(),
        });
        const doc = await docRef.get();
        const payment = { id: doc.id, ...doc.data() } as any;
        payment.order = await fetchOrderWithStudent(orderId);
        return payment;
    }

    async getAllPayments(
        page: number = 1,
        limit: number = 20,
        status?: string,
        orderId?: string
    ) {
        let query: FirebaseFirestore.Query = db.collection('payments');
        if (status) query = query.where('status', '==', status);
        if (orderId) query = query.where('orderId', '==', orderId);

        const snap = await query.get();
        const allPayments: any[] = [];

        for (const doc of snap.docs) {
            const payment = { id: doc.id, ...doc.data() } as any;
            if (payment.orderId) {
                payment.order = await fetchOrderWithStudent(payment.orderId);
            }
            allPayments.push(payment);
        }

        const total = allPayments.length;
        const start = (page - 1) * limit;
        const payments = allPayments.slice(start, start + limit);

        return {
            payments,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async getPaymentStats() {
        const snap = await db.collection('payments').get();
        let total = 0, pending = 0, completed = 0, failed = 0;
        let totalRevenue = 0;
        let totalRefunds = 0;

        snap.docs.forEach(doc => {
            const data = doc.data();
            total++;
            switch (data.status) {
                case 'PENDING': pending++; break;
                case 'COMPLETED':
                    completed++;
                    const amount = Number(data.amount || 0);
                    if (amount > 0) totalRevenue += amount;
                    if (amount < 0) totalRefunds += Math.abs(amount);
                    break;
                case 'FAILED': failed++; break;
            }
        });

        return {
            total,
            byStatus: { pending, completed, failed },
            totalRevenue,
            totalRefunds,
        };
    }
}
