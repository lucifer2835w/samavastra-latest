"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFee = createFee;
exports.getStudentFees = getStudentFees;
exports.payFee = payFee;
const fee_service_1 = require("./fee.service");
const service = new fee_service_1.FeeService();
async function createFee(req, res) {
    try {
        const { studentId, title, amount, dueDate } = req.body;
        const fee = await service.createFee({
            studentId,
            title,
            amount: parseFloat(amount),
            dueDate: new Date(dueDate),
        });
        res.json(fee);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create fee' });
    }
}
const firebase_1 = require("../../config/firebase");
async function getStudentFees(req, res) {
    try {
        // @ts-ignore
        const user = req.user;
        let studentId;
        if (user.roles.includes('STUDENT')) {
            const studentSnap = await firebase_1.db.collection('students').where('userId', '==', user.id).limit(1).get();
            const student = studentSnap.empty ? null : { id: studentSnap.docs[0].id, ...studentSnap.docs[0].data() };
            if (!student)
                return res.status(404).json({ message: "Student profile not found" });
            studentId = student.id;
        }
        else {
            const paramId = req.params.studentId;
            if (!paramId)
                return res.status(400).json({ message: "Student ID parameter required" });
            studentId = paramId;
        }
        const fees = await service.getFeesForStudent(studentId);
        res.json(fees);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch fees' });
    }
}
async function payFee(req, res) {
    try {
        const { feeId, transactionRef } = req.body;
        const fee = await service.payFee(feeId, transactionRef);
        res.json(fee);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to pay fee' });
    }
}
//# sourceMappingURL=fee.controller.js.map