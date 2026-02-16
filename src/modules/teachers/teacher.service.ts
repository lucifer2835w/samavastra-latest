import { prisma } from '../../config/db';
// import { AuthenticatedRequest } from '../../middleware/auth';
// import { Request, Response, NextFunction } from 'express';

export class TeacherService {
    async createTeacher(data: {
        userId: number;
        employeeId: string;
        qualification?: string;
    }) {
        return prisma.teacher.create({
            data: {
                userId: data.userId,
                employeeId: data.employeeId,
                qualification: data.qualification ?? null,
            },
            include: {
                user: true,
            },
        });
    }

    async getTeacherById(id: number) {
        return prisma.teacher.findUnique({
            where: { id },
            include: {
                user: true,
                classes: true,
                subjects: true,
            },
        });
    }

    async getTeacherByUserId(userId: number) {
        return prisma.teacher.findUnique({
            where: { userId },
            include: {
                user: true,
                classes: true,
                subjects: true,
            },
        });
    }

    async getAllTeachers(page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const [teachers, total] = await Promise.all([
            prisma.teacher.findMany({
                skip,
                take: limit,
                include: {
                    user: true,
                    classes: true,
                    subjects: true,
                },
                orderBy: {
                    user: {
                        lastName: 'asc',
                    },
                },
            }),
            prisma.teacher.count(),
        ]);

        return {
            teachers,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async updateTeacher(id: number, data: {
        qualification?: string;
    }) {
        return prisma.teacher.update({
            where: { id },
            data,
            include: {
                user: true,
            },
        });
    }
}
