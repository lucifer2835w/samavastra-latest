import { prisma } from '../../config/db';
import { Prisma } from '../../generated/prisma/client';

export class AcademicsService {
    // --- Classes ---
    async createClass(data: { grade: string; section: string; teacherId?: number }) {
        return prisma.class.create({
            data: {
                grade: data.grade,
                section: data.section,
                teacherId: data.teacherId ?? null,
            },
            include: {
                teacher: { include: { user: true } },
            },
        });
    }

    async getAllClasses() {
        return prisma.class.findMany({
            include: {
                teacher: { include: { user: true } },
                _count: { select: { students: true } },
            },
            orderBy: [{ grade: 'asc' }, { section: 'asc' }],
        });
    }

    async getClassById(id: number) {
        return prisma.class.findUnique({
            where: { id },
            include: {
                teacher: { include: { user: true } },
                students: { include: { user: true } },
                subjects: true,
            },
        });
    }

    // --- Subjects ---
    async createSubject(data: { name: string; code: string; description?: string }) {
        return prisma.subject.create({
            data: {
                name: data.name,
                code: data.code,
                description: data.description ?? null,
            },
        });
    }

    async getAllSubjects() {
        return prisma.subject.findMany({
            orderBy: { name: 'asc' },
        });
    }

    async assignSubjectToTeacher(subjectId: number, teacherId: number) {
        return prisma.subject.update({
            where: { id: subjectId },
            data: {
                teachers: {
                    connect: { id: teacherId },
                },
            },
        });
    }

    async assignSubjectToClass(subjectId: number, classId: number) {
        return prisma.class.update({
            where: { id: classId },
            data: {
                subjects: {
                    connect: { id: subjectId }
                }
            }
        })
    }

    // --- Exams ---
    async createExam(data: { subjectId: number; name: string; date: Date; maxMarks: number }) {
        return prisma.exam.create({
            data: {
                subjectId: data.subjectId,
                name: data.name,
                date: data.date,
                maxMarks: data.maxMarks,
            },
            include: {
                subject: true,
            },
        });
    }

    async getExamsBySubject(subjectId: number) {
        return prisma.exam.findMany({
            where: { subjectId },
            include: {
                subject: true,
                results: {
                    include: {
                        student: { include: { user: true } }
                    }
                }
            },
            orderBy: { date: 'desc' },
        });
    }

    async recordExamResult(data: { examId: number; studentId: number; marksObtained: number; grade?: string }) {
        return prisma.examResult.upsert({
            where: {
                examId_studentId: {
                    examId: data.examId,
                    studentId: data.studentId,
                }
            },
            update: {
                marksObtained: data.marksObtained,
                grade: data.grade ?? null,
            },
            create: {
                examId: data.examId,
                studentId: data.studentId,
                marksObtained: data.marksObtained,
                grade: data.grade ?? null,
            },
            include: {
                exam: { include: { subject: true } },
                student: { include: { user: true } }
            }
        });
    }

    // --- Attendance ---
    async recordAttendance(data: { studentId: number; date: Date; status: string; remarks?: string }) {
        return prisma.attendance.upsert({
            where: {
                studentId_date: {
                    studentId: data.studentId,
                    date: data.date,
                }
            },
            update: {
                status: data.status,
                remarks: data.remarks ?? null,
            },
            create: {
                studentId: data.studentId,
                date: data.date,
                status: data.status,
                remarks: data.remarks ?? null,
            },
            include: {
                student: { include: { user: true } }
            }
        });
    }

    async getAttendanceByClass(classId: number, startDate?: Date, endDate?: Date) {
        const where: any = {
            student: { classId }
        };

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = startDate;
            if (endDate) where.date.lte = endDate;
        }

        return prisma.attendance.findMany({
            where,
            include: {
                student: { include: { user: true } }
            },
            orderBy: [{ date: 'desc' }, { student: { user: { lastName: 'asc' } } }]
        });
    }

    // --- Student Performance ---
    async getStudentPerformance(studentId: number) {
        // Fetch Exam Results
        const examResults = await prisma.examResult.findMany({
            where: { studentId },
            include: {
                exam: { include: { subject: true } }
            }
        });

        // Fetch Attendance Stats
        const attendance = await prisma.attendance.groupBy({
            by: ['status'],
            where: { studentId },
            _count: { status: true }
        });

        const totalDays = attendance.reduce((acc, curr) => acc + curr._count.status, 0);
        const presentDays = attendance.find(a => a.status === 'PRESENT')?._count.status || 0;
        const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

        return {
            examResults: examResults.map(r => ({
                subject: r.exam.subject.name,
                exam: r.exam.name,
                marks: r.marksObtained,
                maxMarks: r.exam.maxMarks,
                grade: r.grade,
            })),
            attendance: {
                present: presentDays,
                total: totalDays,
                percentage: attendancePercentage
            }
        };
    }
}
