import { prisma } from '../../config/db';
import { User, Role } from '../../generated/prisma/client';
import bcrypt from 'bcrypt';

export class AdminService {
    // --- User Management ---

    async getAllUsers(filters?: {
        role?: string;
        search?: string;
        status?: string;
    }) {
        const where: any = {};

        if (filters?.role) {
            where.roles = {
                some: {
                    name: filters.role
                }
            };
        }

        if (filters?.search) {
            where.OR = [
                { email: { contains: filters.search, mode: 'insensitive' } },
                { firstName: { contains: filters.search, mode: 'insensitive' } },
                { lastName: { contains: filters.search, mode: 'insensitive' } }
            ];
        }

        return prisma.user.findMany({
            where,
            include: {
                roles: true,
                student: true,
                teacher: true,
                parent: true,
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getUserById(id: number) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                roles: true,
                student: {
                    include: {
                        class: true
                    }
                },
                teacher: {
                    include: {
                        subjects: true
                    }
                },
                parent: {
                    include: {
                        students: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
    }

    async createUser(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
        roles: string[];
    }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // First get role IDs
        const roleRecords = await prisma.role.findMany({
            where: {
                name: { in: data.roles }
            }
        });

        // Create user with raw query to include password
        const result = await prisma.$executeRaw`
            INSERT INTO "User" (email, password, "firstName", "lastName", phone, "isActive", "createdAt", "updatedAt")
            VALUES (${data.email}, ${hashedPassword}, ${data.firstName}, ${data.lastName}, ${data.phone ?? null}, true, NOW(), NOW())
            RETURNING id
        `;

        // Get the created user
        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) throw new Error('User creation failed');

        // Create role assignments
        await prisma.userRole.createMany({
            data: roleRecords.map(role => ({
                userId: user.id,
                roleId: role.id
            }))
        });

        return prisma.user.findUnique({
            where: { id: user.id },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
    }

    async updateUser(id: number, data: {
        email?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
    }) {
        const updateData: any = {};
        if (data.email !== undefined) updateData.email = data.email;
        if (data.firstName !== undefined) updateData.firstName = data.firstName;
        if (data.lastName !== undefined) updateData.lastName = data.lastName;
        if (data.phone !== undefined) updateData.phone = data.phone ?? null;

        return prisma.user.update({
            where: { id },
            data: updateData,
            include: {
                roles: true
            }
        });
    }

    async assignRoles(userId: number, roleNames: string[]) {
        // First, delete all existing role assignments
        await prisma.userRole.deleteMany({
            where: { userId }
        });

        // Get role IDs
        const roleRecords = await prisma.role.findMany({
            where: {
                name: { in: roleNames }
            }
        });

        // Create new role assignments
        await prisma.userRole.createMany({
            data: roleRecords.map(role => ({
                userId,
                roleId: role.id
            }))
        });

        return prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
    }

    async deactivateUser(userId: number) {
        // Remove all role assignments to effectively deactivate
        await prisma.userRole.deleteMany({
            where: { userId }
        });

        return prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
    }

    async resetPassword(userId: number, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Password update needs to be done via raw query or separate update
        await prisma.$executeRaw`UPDATE "User" SET password = ${hashedPassword} WHERE id = ${userId}`;
        return prisma.user.findUnique({ where: { id: userId } });
    }

    // --- System Analytics ---

    async getSystemAnalytics() {
        const [
            totalStudents,
            totalTeachers,
            totalParents,
            totalClasses,
            totalSubjects,
            totalUsers,
            recentEnrollments,
            feeStats,
            attendanceStats
        ] = await Promise.all([
            // Student count
            prisma.student.count(),

            // Teacher count
            prisma.teacher.count(),

            // Parent count
            prisma.parent.count(),

            // Class count
            prisma.class.count(),

            // Subject count
            prisma.subject.count(),

            // Total users
            prisma.user.count(),

            // Recent enrollments (last 30 days) - count all students for now
            prisma.student.count(),

            // Fee statistics
            this.getFeeStatistics(),

            // Attendance statistics
            this.getAttendanceStatistics()
        ]);

        return {
            users: {
                total: totalUsers,
                students: totalStudents,
                teachers: totalTeachers,
                parents: totalParents
            },
            academics: {
                classes: totalClasses,
                subjects: totalSubjects
            },
            enrollment: {
                recentEnrollments
            },
            fees: feeStats,
            attendance: attendanceStats
        };
    }

    private async getFeeStatistics() {
        const [totalFees, paidFees, pendingFees, overdueFees] = await Promise.all([
            prisma.fee.aggregate({
                _sum: { amount: true }
            }),
            prisma.fee.aggregate({
                where: { status: 'PAID' },
                _sum: { amount: true }
            }),
            prisma.fee.aggregate({
                where: { status: 'PENDING' },
                _sum: { amount: true }
            }),
            prisma.fee.aggregate({
                where: { status: 'OVERDUE' },
                _sum: { amount: true }
            })
        ]);

        return {
            total: totalFees._sum.amount || 0,
            collected: paidFees._sum.amount || 0,
            pending: pendingFees._sum.amount || 0,
            overdue: overdueFees._sum.amount || 0
        };
    }

    private async getAttendanceStatistics() {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const attendanceData = await prisma.attendance.groupBy({
            by: ['status'],
            where: {
                date: {
                    gte: thirtyDaysAgo
                }
            },
            _count: {
                status: true
            }
        });

        const stats: any = {
            present: 0,
            absent: 0,
            late: 0,
            excused: 0
        };

        attendanceData.forEach(record => {
            stats[record.status.toLowerCase()] = record._count.status;
        });

        const total = (Object.values(stats) as number[]).reduce((sum, count) => sum + count, 0);
        const attendanceRate = total > 0 ? Math.round((stats.present / total) * 100) : 0;

        return {
            ...stats,
            total,
            attendanceRate
        };
    }

    async getEnrollmentTrends(months: number = 6) {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - months);

        // Use User.createdAt for enrollment trends
        const enrollments = await prisma.user.findMany({
            where: {
                student: { isNot: null },
                createdAt: {
                    gte: startDate
                }
            },
            select: {
                createdAt: true
            }
        });

        // Group by month
        const monthlyData: { [key: string]: number } = {};
        enrollments.forEach(enrollment => {
            const monthKey = enrollment.createdAt.toISOString().substring(0, 7); // YYYY-MM
            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
        });

        return Object.entries(monthlyData).map(([month, count]) => ({
            month,
            count
        }));
    }

    async getClassDistribution() {
        const classes = await prisma.class.findMany({
            include: {
                _count: {
                    select: { students: true }
                }
            }
        });

        return classes.map(cls => ({
            name: `Grade ${cls.grade} - ${cls.section}`,
            studentCount: cls._count.students
        }));
    }
}
