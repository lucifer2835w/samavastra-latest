import { prisma } from '../../config/db';

export class ParentService {
    // Get parent's children with access permissions
    async getParentChildren(parentId: number) {
        return prisma.parentAccess.findMany({
            where: { parentId },
            include: {
                student: {
                    include: {
                        user: true,
                        class: true,
                    },
                },
            },
        });
    }

    // Get child's academic performance
    async getChildPerformance(parentId: number, studentId: number) {
        // Verify parent has access
        const access = await prisma.parentAccess.findUnique({
            where: {
                parentId_studentId: { parentId, studentId },
            },
        });

        if (!access) {
            throw new Error('Access denied to this student');
        }

        const student = await prisma.student.findUnique({
            where: { id: studentId },
            include: {
                user: true,
                class: true,
                results: access.canViewGrades ? {
                    include: {
                        exam: {
                            include: {
                                subject: true,
                            },
                        },
                    },
                } : false,
                attendance: access.canViewAttendance ? {
                    orderBy: { date: 'desc' },
                    take: 30,
                } : false,
                fees: access.canViewFees ? {
                    orderBy: { dueDate: 'desc' },
                } : false,
                homeworkSubmissions: access.canViewHomework ? {
                    include: {
                        homework: {
                            include: {
                                subject: true,
                            },
                        },
                    },
                    orderBy: { submittedAt: 'desc' },
                    take: 20,
                } : false,
            },
        });

        return student;
    }

    // Get child's grades
    async getChildGrades(parentId: number, studentId: number) {
        const access = await this.verifyAccess(parentId, studentId, 'canViewGrades');

        return prisma.examResult.findMany({
            where: { studentId },
            include: {
                exam: {
                    include: {
                        subject: true,
                    },
                },
            },
            orderBy: { exam: { date: 'desc' } },
        });
    }

    // Get child's attendance
    async getChildAttendance(parentId: number, studentId: number, days: number = 30) {
        const access = await this.verifyAccess(parentId, studentId, 'canViewAttendance');

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        return prisma.attendance.findMany({
            where: {
                studentId,
                date: { gte: startDate },
            },
            orderBy: { date: 'desc' },
        });
    }

    // Get child's fees
    async getChildFees(parentId: number, studentId: number) {
        const access = await this.verifyAccess(parentId, studentId, 'canViewFees');

        return prisma.fee.findMany({
            where: { studentId },
            orderBy: { dueDate: 'desc' },
        });
    }

    // Get child's homework
    async getChildHomework(parentId: number, studentId: number) {
        const access = await this.verifyAccess(parentId, studentId, 'canViewHomework');

        return prisma.homeworkSubmission.findMany({
            where: { studentId },
            include: {
                homework: {
                    include: {
                        subject: true,
                    },
                },
            },
            orderBy: { submittedAt: 'desc' },
        });
    }

    // Update parent access permissions
    async updateAccess(parentId: number, studentId: number, permissions: {
        canViewGrades?: boolean;
        canViewAttendance?: boolean;
        canViewFees?: boolean;
        canViewHomework?: boolean;
    }) {
        return prisma.parentAccess.upsert({
            where: {
                parentId_studentId: { parentId, studentId },
            },
            update: permissions,
            create: {
                parentId,
                studentId,
                ...permissions,
            },
        });
    }

    // Helper to verify access
    private async verifyAccess(
        parentId: number,
        studentId: number,
        permission: keyof Pick<any, 'canViewGrades' | 'canViewAttendance' | 'canViewFees' | 'canViewHomework'>
    ) {
        const access = await prisma.parentAccess.findUnique({
            where: {
                parentId_studentId: { parentId, studentId },
            },
        });

        if (!access || !access[permission]) {
            throw new Error(`Access denied: ${permission}`);
        }

        return access;
    }
}
