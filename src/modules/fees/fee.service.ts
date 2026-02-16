import { db } from '../../config/firebase';

export class FeeService {
    async createFee(data: {
        studentId: string;
        title: string;
        amount: number;
        dueDate: Date;
    }) {
        const docRef = await db.collection('fees').add({
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

    async getFeesForStudent(studentId: string) {
        const snap = await db.collection('fees')
            .where('studentId', '==', studentId)
            .orderBy('dueDate', 'asc')
            .get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async payFee(feeId: string, transactionRef: string) {
        const docRef = db.collection('fees').doc(feeId);
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
