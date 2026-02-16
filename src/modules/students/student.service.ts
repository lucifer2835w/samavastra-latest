import { prisma } from '../../config/db';
import { Prisma } from '../../generated/prisma/client';

export class StudentService {
    async createStudent(data: {
        userId: number;
        studentNumber: string;
        classId?: number;
        parentId?: number;
        status?: string;
    }) {
        return prisma.student.create({
            data: {
                userId: data.userId,
                studentNumber: data.studentNumber,
                classId: data.classId ?? null,
                parentId: data.parentId ?? null,
                status: data.status || 'ACTIVE',
            },
            include: {
                user: true,
                class: true,
            },
        });
    }

    async createStudentWithUser(data: {
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        studentNumber: string;
        classId?: number | undefined;
        parentId?: number | undefined;
        phone?: string | null | undefined;
    }) {
        return prisma.$transaction(async (tx) => {
            // 1. Get Student Role
            const studentRole = await tx.role.findFirst({
                where: { name: 'STUDENT' }
            });

            if (!studentRole) {
                throw new Error('Student role not found');
            }

            // 2. Create User
            const user = await tx.user.create({
                data: {
                    email: data.email,
                    passwordHash: data.passwordHash,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone ?? null,
                },
            });

            // 3. Assign Role
            await tx.userRole.create({
                data: {
                    userId: user.id,
                    roleId: studentRole.id
                }
            });

            // 4. Create Student Profile
            const student = await tx.student.create({
                data: {
                    userId: user.id,
                    studentNumber: data.studentNumber,
                    classId: data.classId ?? null,
                    parentId: data.parentId ?? null,
                    status: 'ACTIVE',
                },
                include: {
                    user: true,
                    class: true,
                },
            });

            return student;
        });
    }

    async getStudentById(id: number) {
        return prisma.student.findUnique({
            where: { id },
            include: {
                user: true,
                class: true,
                parent: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async getStudentByUserId(userId: number) {
        return prisma.student.findUnique({
            where: { userId },
            include: {
                user: true,
                class: true,
            },
        });
    }

    async getAllStudents(page: number = 1, limit: number = 20, classId?: number) {
        const skip = (page - 1) * limit;
        const where: Prisma.StudentWhereInput = {};

        if (classId) {
            where.classId = classId;
        }

        const [students, total] = await Promise.all([
            prisma.student.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: true,
                    class: true,
                },
                orderBy: {
                    user: {
                        lastName: 'asc',
                    },
                },
            }),
            prisma.student.count({ where }),
        ]);

        return {
            students,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async updateStudent(id: number, data: {
        classId?: number;
        parentId?: number;
        status?: string;
    }) {
        return prisma.student.update({
            where: { id },
            data,
            include: {
                user: true,
                class: true,
            },
        });
    }
}
