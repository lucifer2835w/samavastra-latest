import { prisma } from '../../config/db';

export class ReportService {
    // Generate student report card
    async generateStudentReportCard(studentId: number) {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
            include: {
                user: true,
                class: true,
                results: {
                    include: {
                        exam: {
                            include: {
                                subject: true,
                            },
                        },
                    },
                    orderBy: { exam: { date: 'desc' } },
                },
                attendance: {
                    orderBy: { date: 'desc' },
                    take: 90, // Last 90 days
                },
                fees: {
                    orderBy: { dueDate: 'desc' },
                },
            },
        });

        if (!student) {
            throw new Error('Student not found');
        }

        // Calculate attendance statistics
        const attendanceStats = this.calculateAttendanceStats(student.attendance);

        // Calculate grade statistics
        const gradeStats = this.calculateGradeStats(student.results);

        // Calculate fee statistics
        const feeStats = this.calculateFeeStats(student.fees);

        return {
            student: {
                id: student.id,
                name: `${student.user.firstName} ${student.user.lastName}`,
                studentNumber: student.studentNumber,
                class: student.class ? `${student.class.grade}-${student.class.section}` : null,
                status: student.status,
            },
            academics: {
                results: student.results,
                gradeStats,
            },
            attendance: {
                records: student.attendance,
                stats: attendanceStats,
            },
            fees: {
                records: student.fees,
                stats: feeStats,
            },
        };
    }

    // Generate class performance report
    async generateClassPerformanceReport(classId: number) {
        const classData = await prisma.class.findUnique({
            where: { id: classId },
            include: {
                students: {
                    include: {
                        user: true,
                        results: {
                            include: {
                                exam: {
                                    include: {
                                        subject: true,
                                    },
                                },
                            },
                        },
                    },
                },
                teacher: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!classData) {
            throw new Error('Class not found');
        }

        // Calculate subject-wise performance
        const subjectPerformance = this.calculateSubjectPerformance(classData.students);

        return {
            class: {
                id: classData.id,
                name: `${classData.grade}-${classData.section}`,
                teacher: classData.teacher ? `${classData.teacher.user.firstName} ${classData.teacher.user.lastName}` : null,
                studentCount: classData.students.length,
            },
            subjectPerformance,
            students: classData.students.map(s => ({
                id: s.id,
                name: `${s.user.firstName} ${s.user.lastName}`,
                studentNumber: s.studentNumber,
                resultsCount: s.results.length,
            })),
        };
    }

    // Generate attendance report
    async generateAttendanceReport(params: {
        classId?: number;
        studentId?: number;
        startDate: Date;
        endDate: Date;
    }) {
        const where: any = {
            date: {
                gte: params.startDate,
                lte: params.endDate,
            },
        };

        if (params.studentId) {
            where.studentId = params.studentId;
        } else if (params.classId) {
            where.student = {
                classId: params.classId,
            };
        }

        const attendance = await prisma.attendance.findMany({
            where,
            include: {
                student: {
                    include: {
                        user: true,
                        class: true,
                    },
                },
            },
            orderBy: { date: 'desc' },
        });

        const stats = this.calculateAttendanceStats(attendance);

        return {
            attendance,
            stats,
            dateRange: {
                start: params.startDate,
                end: params.endDate,
            },
        };
    }

    // Generate fee collection report
    async generateFeeCollectionReport(params: {
        startDate?: Date;
        endDate?: Date;
        status?: string;
    }) {
        const where: any = {};

        if (params.startDate && params.endDate) {
            where.dueDate = {
                gte: params.startDate,
                lte: params.endDate,
            };
        }

        if (params.status) {
            where.status = params.status;
        }

        const fees = await prisma.fee.findMany({
            where,
            include: {
                student: {
                    include: {
                        user: true,
                        class: true,
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        });

        const stats = this.calculateFeeStats(fees);

        return {
            fees,
            stats,
        };
    }

    // Generate teacher workload report
    async generateTeacherWorkloadReport(teacherId?: number) {
        const where = teacherId ? { id: teacherId } : {};

        const teachers = await prisma.teacher.findMany({
            where,
            include: {
                user: true,
                classes: {
                    include: {
                        students: true,
                    },
                },
            },
        });

        return teachers.map(teacher => ({
            id: teacher.id,
            name: `${teacher.user.firstName} ${teacher.user.lastName}`,
            employeeId: teacher.employeeId,
            classCount: teacher.classes.length,
            subjectCount: 0, // Subjects are many-to-many, count not directly available
            totalStudents: teacher.classes.reduce((sum: number, cls: any) => sum + cls.students.length, 0),
            classes: teacher.classes.map((cls: any) => ({
                id: cls.id,
                name: `${cls.grade}-${cls.section}`,
                studentCount: cls.students.length,
            })),
            subjects: [], // Subject relation is many-to-many through classes
        }));
    }

    // Helper: Calculate attendance statistics
    private calculateAttendanceStats(attendance: any[]) {
        const total = attendance.length;
        const present = attendance.filter(a => a.status === 'PRESENT').length;
        const absent = attendance.filter(a => a.status === 'ABSENT').length;
        const late = attendance.filter(a => a.status === 'LATE').length;
        const excused = attendance.filter(a => a.status === 'EXCUSED').length;

        return {
            total,
            present,
            absent,
            late,
            excused,
            attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
        };
    }

    // Helper: Calculate grade statistics
    private calculateGradeStats(results: any[]) {
        if (results.length === 0) return { average: 0, highest: 0, lowest: 0, count: 0 };

        const marks = results.map(r => r.marksObtained);
        const average = Math.round(marks.reduce((sum, m) => sum + m, 0) / marks.length);
        const highest = Math.max(...marks);
        const lowest = Math.min(...marks);

        return {
            average,
            highest,
            lowest,
            count: results.length,
        };
    }

    // Helper: Calculate fee statistics
    private calculateFeeStats(fees: any[]) {
        const total = fees.reduce((sum, f) => sum + f.amount, 0);
        const paid = fees.filter(f => f.status === 'PAID').reduce((sum, f) => sum + f.amount, 0);
        const pending = fees.filter(f => f.status === 'PENDING').reduce((sum, f) => sum + f.amount, 0);
        const overdue = fees.filter(f => f.status === 'OVERDUE').reduce((sum, f) => sum + f.amount, 0);

        return {
            total,
            paid,
            pending,
            overdue,
            count: fees.length,
        };
    }

    // Helper: Calculate subject-wise performance
    private calculateSubjectPerformance(students: any[]) {
        const subjectMap = new Map<number, { name: string; results: any[] }>();

        students.forEach(student => {
            student.results.forEach((result: any) => {
                const subjectId = result.exam.subject.id;
                if (!subjectMap.has(subjectId)) {
                    subjectMap.set(subjectId, {
                        name: result.exam.subject.name,
                        results: [],
                    });
                }
                subjectMap.get(subjectId)!.results.push(result);
            });
        });

        return Array.from(subjectMap.entries()).map(([id, data]) => ({
            subjectId: id,
            subjectName: data.name,
            stats: this.calculateGradeStats(data.results),
        }));
    }
}
