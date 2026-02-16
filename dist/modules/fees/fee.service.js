"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeService = void 0;
const firebase_1 = require("../../config/firebase");
class FeeService {
    async createFee(data) {
        const docRef = await firebase_1.db.collection('fees').add({
            studentId: data.studentId,
            title: data.title,
            amount: data.amount,
            dueDate: data.dueDate,
            status: 'PENDING',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
    async getFeesForStudent(studentId) {
        const snap = await firebase_1.db.collection('fees')
            .where('studentId', '==', studentId)
            .orderBy('dueDate', 'asc')
            .get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async payFee(feeId, transactionRef) {
        const docRef = firebase_1.db.collection('fees').doc(feeId);
        await docRef.update({
            status: 'PAID',
            paymentDate: new Date(),
            transactionRef,
            updatedAt: new Date(),
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
}
exports.FeeService = FeeService;
//# sourceMappingURL=fee.service.js.map