import { db } from '../../config/firebase';

// Helper functions
async function fetchUser(userId: string) {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchSubject(subjectId: string) {
    const doc = await db.collection('subjects').doc(subjectId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchClass(classId: string) {
    const doc = await db.collection('classes').doc(classId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export class ParentService {
    async getParentChildren(parentId: string) {
        const snap = await db.collection('parentAccess').where('parentId', '==', parentId).get();
        const results: any[] = [];

        for (const doc of snap.docs) {
            const access = { id: doc.id, ...doc.data() } as any;
            if (access.studentId) {
                const studentDoc = await db.collection('students').doc(access.studentId).get();
                if (studentDoc.exists) {
                    access.student = { id: studentDoc.id, ...studentDoc.data() } as any;
                    if (access.student.userId) {
                        access.student.user = await fetchUser(access.student.userId);
                    }
                    if (access.student.classId) {
                        access.student.class = await fetchClass(access.student.classId);
                    }
                }
            }
            results.push(access);
        }
        return results;
    }

    async getChildPerformance(parentId: string, studentId: string) {
        // Verify parent has access
        const accessSnap = await db.collection('parentAccess')
            .where('parentId', '==', parentId)
            .where('studentId', '==', studentId)
            .limit(1)
            .get();

        if (accessSnap.empty) {
            throw new Error('Access denied to this student');
        }

        const access = accessSnap.docs[0].data();

        const studentDoc = await db.collection('students').doc(studentId).get();
        if (!studentDoc.exists) return null;
        const student = { id: studentDoc.id, ...studentDoc.data() } as any;

        if (student.userId) student.user = await fetchUser(student.userId);
        if (student.classId) student.class = await fetchClass(student.classId);

        // Results
        if (access.canViewGrades) {
            const resultsSnap = await db.collection('examResults').where('studentId', '==', studentId).get();
            student.results = [];
            for (const doc of resultsSnap.docs) {
                const result = { id: doc.id, ...doc.data() } as any;
                if (result.examId) {
                    const examDoc = await db.collection('exams').doc(result.examId).get();
                    if (examDoc.exists) {
                        result.exam = { id: examDoc.id, ...examDoc.data() } as any;
                        if (result.exam.subjectId) {
                            result.exam.subject = await fetchSubject(result.exam.subjectId);
                        }
                    }
                }
                student.results.push(result);
            }
        }

        // Attendance
        if (access.canViewAttendance) {
            const attSnap = await db.collection('attendance')
                .where('studentId', '==', studentId)
                .orderBy('date', 'desc')
                .limit(30)
                .get();
            student.attendance = attSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        // Fees
        if (access.canViewFees) {
            const feesSnap = await db.collection('fees')
                .where('studentId', '==', studentId)
                .orderBy('dueDate', 'desc')
                .get();
            student.fees = feesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        // Homework
        if (access.canViewHomework) {
            const hwSubSnap = await db.collection('homeworkSubmissions')
                .where('studentId', '==', studentId)
                .orderBy('submittedAt', 'desc')
                .limit(20)
                .get();
            student.homeworkSubmissions = [];
            for (const doc of hwSubSnap.docs) {
                const sub = { id: doc.id, ...doc.data() } as any;
                if (sub.homeworkId) {
                    const hwDoc = await db.collection('homework').doc(sub.homeworkId).get();
                    if (hwDoc.exists) {
                        sub.homework = { id: hwDoc.id, ...hwDoc.data() } as any;
                        if (sub.homework.subjectId) {
                            sub.homework.subject = await fetchSubject(sub.homework.subjectId);
                        }
                    }
                }
                student.homeworkSubmissions.push(sub);
            }
        }

        return student;
    }

    async getChildGrades(parentId: string, studentId: string) {
        await this.verifyAccess(parentId, studentId, 'canViewGrades');

        const snap = await db.collection('examResults')
            .where('studentId', '==', studentId)
            .get();

        const results: any[] = [];
        for (const doc of snap.docs) {
            const result = { id: doc.id, ...doc.data() } as any;
            if (result.examId) {
                const examDoc = await db.collection('exams').doc(result.examId).get();
                if (examDoc.exists) {
                    result.exam = { id: examDoc.id, ...examDoc.data() } as any;
                    if (result.exam.subjectId) {
                        result.exam.subject = await fetchSubject(result.exam.subjectId);
                    }
                }
            }
            results.push(result);
        }

        // Sort by exam date desc
        results.sort((a, b) => {
            const aDate = a.exam?.date?.toDate?.() || a.exam?.date || 0;
            const bDate = b.exam?.date?.toDate?.() || b.exam?.date || 0;
            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });

        return results;
    }

    async getChildAttendance(parentId: string, studentId: string, days: number = 30) {
        await this.verifyAccess(parentId, studentId, 'canViewAttendance');

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const snap = await db.collection('attendance')
            .where('studentId', '==', studentId)
            .where('date', '>=', startDate)
            .orderBy('date', 'desc')
            .get();

        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getChildFees(parentId: string, studentId: string) {
        await this.verifyAccess(parentId, studentId, 'canViewFees');

        const snap = await db.collection('fees')
            .where('studentId', '==', studentId)
            .orderBy('dueDate', 'desc')
            .get();

        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getChildHomework(parentId: string, studentId: string) {
        await this.verifyAccess(parentId, studentId, 'canViewHomework');

        const snap = await db.collection('homeworkSubmissions')
            .where('studentId', '==', studentId)
            .orderBy('submittedAt', 'desc')
            .get();

        const results: any[] = [];
        for (const doc of snap.docs) {
            const sub = { id: doc.id, ...doc.data() } as any;
            if (sub.homeworkId) {
                const hwDoc = await db.collection('homework').doc(sub.homeworkId).get();
                if (hwDoc.exists) {
                    sub.homework = { id: hwDoc.id, ...hwDoc.data() } as any;
                    if (sub.homework.subjectId) {
                        sub.homework.subject = await fetchSubject(sub.homework.subjectId);
                    }
                }
            }
            results.push(sub);
        }
        return results;
    }

    async updateAccess(parentId: string, studentId: string, permissions: {
        canViewGrades?: boolean;
        canViewAttendance?: boolean;
        canViewFees?: boolean;
        canViewHomework?: boolean;
    }) {
        // Upsert
        const existingSnap = await db.collection('parentAccess')
            .where('parentId', '==', parentId)
            .where('studentId', '==', studentId)
            .limit(1)
            .get();

        if (!existingSnap.empty) {
            await existingSnap.docs[0].ref.update(permissions);
            const updated = await existingSnap.docs[0].ref.get();
            return { id: updated.id, ...updated.data() };
        } else {
            const docRef = await db.collection('parentAccess').add({
                parentId,
                studentId,
                canViewGrades: permissions.canViewGrades ?? true,
                canViewAttendance: permissions.canViewAttendance ?? true,
                canViewFees: permissions.canViewFees ?? true,
                canViewHomework: permissions.canViewHomework ?? true,
            });
            const doc = await docRef.get();
            return { id: doc.id, ...doc.data() };
        }
    }

    private async verifyAccess(
        parentId: string,
        studentId: string,
        permission: string
    ) {
        const snap = await db.collection('parentAccess')
            .where('parentId', '==', parentId)
            .where('studentId', '==', studentId)
            .limit(1)
            .get();

        if (snap.empty) {
            throw new Error(`Access denied: ${permission}`);
        }

        const access = snap.docs[0].data();
        if (!access[permission]) {
            throw new Error(`Access denied: ${permission}`);
        }

        return access;
    }
}
