"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
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
class PaymentService {
    async createPayment(data) {
        const docRef = await firebase_1.db.collection('payments').add({
            orderId: data.orderId,
            amount: data.amount,
            status: 'PENDING',
            paymentMethod: data.paymentMethod,
            transactionReference: data.transactionReference || null,
            paidAt: null,
        });
        const doc = await docRef.get();
        const payment = { id: doc.id, ...doc.data() };
        payment.order = await fetchOrderWithStudent(data.orderId);
        return payment;
    }
    async getPaymentById(id) {
        const doc = await firebase_1.db.collection('payments').doc(id).get();
        if (!doc.exists)
            return null;
        const payment = { id: doc.id, ...doc.data() };
        if (payment.orderId) {
            payment.order = await fetchOrderWithStudent(payment.orderId);
        }
        return payment;
    }
    async getPaymentsByOrderId(orderId) {
        const snap = await firebase_1.db.collection('payments')
            .where('orderId', '==', orderId)
            .get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async updatePaymentStatus(id, status, transactionReference) {
        return await firebase_1.db.runTransaction(async (transaction) => {
            const paymentDoc = await transaction.get(firebase_1.db.collection('payments').doc(id));
            if (!paymentDoc.exists)
                throw new Error('Payment not found');
            const updateData = { status };
            if (status === 'COMPLETED') {
                updateData.paidAt = new Date();
            }
            if (transactionReference) {
                updateData.transactionReference = transactionReference;
            }
            transaction.update(paymentDoc.ref, updateData);
            const paymentData = paymentDoc.data();
            // If payment is completed, check if order should be updated
            if (status === 'COMPLETED' && paymentData.orderId) {
                const paymentsSnap = await transaction.get(firebase_1.db.collection('payments').where('orderId', '==', paymentData.orderId));
                let totalPaid = 0;
                paymentsSnap.docs.forEach(pDoc => {
                    const p = pDoc.data();
                    if (p.status === 'COMPLETED' || pDoc.id === id) {
                        totalPaid += Number(p.amount || 0);
                    }
                });
                const orderDoc = await transaction.get(firebase_1.db.collection('orders').doc(paymentData.orderId));
                if (orderDoc.exists && totalPaid >= Number(orderDoc.data().totalAmount)) {
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
    async processRefund(orderId, amount, reason) {
        const docRef = await firebase_1.db.collection('payments').add({
            orderId,
            amount: -Math.abs(amount),
            status: 'COMPLETED',
            paymentMethod: 'REFUND',
            transactionReference: `REFUND-${Date.now()}`,
            paidAt: new Date(),
        });
        const doc = await docRef.get();
        const payment = { id: doc.id, ...doc.data() };
        payment.order = await fetchOrderWithStudent(orderId);
        return payment;
    }
    async getAllPayments(page = 1, limit = 20, status, orderId) {
        let query = firebase_1.db.collection('payments');
        if (status)
            query = query.where('status', '==', status);
        if (orderId)
            query = query.where('orderId', '==', orderId);
        const snap = await query.get();
        const allPayments = [];
        for (const doc of snap.docs) {
            const payment = { id: doc.id, ...doc.data() };
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
        const snap = await firebase_1.db.collection('payments').get();
        let total = 0, pending = 0, completed = 0, failed = 0;
        let totalRevenue = 0;
        let totalRefunds = 0;
        snap.docs.forEach(doc => {
            const data = doc.data();
            total++;
            switch (data.status) {
                case 'PENDING':
                    pending++;
                    break;
                case 'COMPLETED':
                    completed++;
                    const amount = Number(data.amount || 0);
                    if (amount > 0)
                        totalRevenue += amount;
                    if (amount < 0)
                        totalRefunds += Math.abs(amount);
                    break;
                case 'FAILED':
                    failed++;
                    break;
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
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map