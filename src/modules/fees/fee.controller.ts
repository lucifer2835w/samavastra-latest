import { Request, Response } from 'express';
import { FeeService } from './fee.service';

const service = new FeeService();

export async function createFee(req: Request, res: Response) {
    try {
        const { studentId, title, amount, dueDate } = req.body;
        const fee = await service.createFee({
            studentId,
            title,
            amount: parseFloat(amount),
            dueDate: new Date(dueDate),
        });
        res.json(fee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create fee' });
    }
}

import { prisma } from '../../config/db';

export async function getStudentFees(req: Request, res: Response) {
    try {
        // @ts-ignore
        const user = req.user;
        let studentId;

        if (user.roles.includes('STUDENT')) {
            const student = await prisma.student.findUnique({ where: { userId: user.id } });
            if (!student) return res.status(404).json({ message: "Student profile not found" });
            studentId = student.id;
        } else {
            const paramId = req.params.studentId;
            if (!paramId) return res.status(400).json({ message: "Student ID parameter required" });
            studentId = parseInt(paramId as string);
        }

        const fees = await service.getFeesForStudent(studentId);
        res.json(fees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch fees' });
    }
}

export async function payFee(req: Request, res: Response) {
    try {
        const { feeId, transactionRef } = req.body;
        const fee = await service.payFee(feeId, transactionRef);
        res.json(fee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to pay fee' });
    }
}
