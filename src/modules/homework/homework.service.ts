import { prisma } from '../../config/db';

export class HomeworkService {
    // Teacher creates homework assignment
    async createHomework(data: {
        subjectId: number;
        title: string;
        description?: string;
        dueDate: Date;
    }) {
        return prisma.homework.create({
            data: {
                subjectId: data.subjectId,
                title: data.title,
                description: data.description ?? null,
                dueDate: data.dueDate,
            },
            include: {
                subject: true,
            },
        });
    }

    // Get all homework (for admin/teacher list)
    async getAllHomework() {
        return prisma.homework.findMany({
            include: {
                subject: true,
                // class: true, // REMOVED: Homework does not have a direct class relation in schema.
            },
            orderBy: { dueDate: 'desc' },
        });
    }

    // Get homework by subject
    async getHomeworkBySubject(subjectId: number) {
        return prisma.homework.findMany({
            where: { subjectId },
            include: {
                subject: true,
                submissions: {
                    include: {
                        student: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        });
    }

    // Get homework by ID
    async getHomeworkById(id: number) {
        return prisma.homework.findUnique({
            where: { id },
            include: {
                subject: true,
                submissions: {
                    include: {
                        student: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
    }

    // Student submits homework
    async submitHomework(data: {
        homeworkId: number;
        studentId: number;
        content?: string;
        fileUrl?: string;
    }) {
        // Check if already submitted
        const existing = await prisma.homeworkSubmission.findFirst({
            where: {
                homeworkId: data.homeworkId,
                studentId: data.studentId,
            },
        });

        if (existing) {
            // Update existing submission
            return prisma.homeworkSubmission.update({
                where: { id: existing.id },
                data: {
                    content: data.content ?? null,
                    fileUrl: data.fileUrl ?? null,
                    submittedAt: new Date(),
                },
                include: {
                    homework: true,
                    student: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
        }

        // Create new submission
        return prisma.homeworkSubmission.create({
            data: {
                homeworkId: data.homeworkId,
                studentId: data.studentId,
                content: data.content ?? null,
                fileUrl: data.fileUrl ?? null,
            },
            include: {
                homework: true,
                student: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    // Teacher grades homework
    async gradeHomework(submissionId: number, grade: string) {
        return prisma.homeworkSubmission.update({
            where: { id: submissionId },
            data: { grade },
            include: {
                homework: true,
                student: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    // Get student's homework assignments
    async getStudentHomework(studentId: number) {
        const submissions = await prisma.homeworkSubmission.findMany({
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

        // Also get homework without submissions
        const allHomework = await prisma.homework.findMany({
            include: {
                subject: true,
                submissions: {
                    where: { studentId },
                },
            },
            orderBy: { dueDate: 'desc' },
        });

        return {
            submissions,
            allHomework,
        };
    }

    // Get submissions for a specific homework
    async getHomeworkSubmissions(homeworkId: number) {
        return prisma.homeworkSubmission.findMany({
            where: { homeworkId },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: { submittedAt: 'desc' },
        });
    }
}
