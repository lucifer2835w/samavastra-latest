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

export class HomeworkService {
    async createHomework(data: {
        subjectId: string;
        title: string;
        description?: string;
        dueDate: Date;
    }) {
        const docRef = await db.collection('homework').add({
            subjectId: data.subjectId,
            title: data.title,
            description: data.description || null,
            dueDate: data.dueDate,
        });
        const doc = await docRef.get();
        const hw = { id: doc.id, ...doc.data() } as any;
        hw.subject = await fetchSubject(data.subjectId);
        return hw;
    }

    async getAllHomework() {
        const snap = await db.collection('homework').orderBy('dueDate', 'desc').get();
        const results: any[] = [];
        for (const doc of snap.docs) {
            const hw = { id: doc.id, ...doc.data() } as any;
            if (hw.subjectId) {
                hw.subject = await fetchSubject(hw.subjectId);
            }
            results.push(hw);
        }
        return results;
    }

    async getHomeworkBySubject(subjectId: string) {
        const snap = await db.collection('homework')
            .where('subjectId', '==', subjectId)
            .orderBy('dueDate', 'desc')
            .get();

        const results: any[] = [];
        for (const doc of snap.docs) {
            const hw = { id: doc.id, ...doc.data() } as any;
            hw.subject = await fetchSubject(subjectId);

            // Fetch submissions
            const subsSnap = await db.collection('homeworkSubmissions').where('homeworkId', '==', doc.id).get();
            hw.submissions = [];
            for (const subDoc of subsSnap.docs) {
                const sub = { id: subDoc.id, ...subDoc.data() } as any;
                if (sub.studentId) {
                    const studentDoc = await db.collection('students').doc(sub.studentId).get();
                    if (studentDoc.exists) {
                        sub.student = { id: studentDoc.id, ...studentDoc.data() } as any;
                        if (sub.student.userId) {
                            sub.student.user = await fetchUser(sub.student.userId);
                        }
                    }
                }
                hw.submissions.push(sub);
            }
            results.push(hw);
        }
        return results;
    }

    async getHomeworkById(id: string) {
        const doc = await db.collection('homework').doc(id).get();
        if (!doc.exists) return null;
        const hw = { id: doc.id, ...doc.data() } as any;

        if (hw.subjectId) {
            hw.subject = await fetchSubject(hw.subjectId);
        }

        // Fetch submissions
        const subsSnap = await db.collection('homeworkSubmissions').where('homeworkId', '==', id).get();
        hw.submissions = [];
        for (const subDoc of subsSnap.docs) {
            const sub = { id: subDoc.id, ...subDoc.data() } as any;
            if (sub.studentId) {
                const studentDoc = await db.collection('students').doc(sub.studentId).get();
                if (studentDoc.exists) {
                    sub.student = { id: studentDoc.id, ...studentDoc.data() } as any;
                    if (sub.student.userId) {
                        sub.student.user = await fetchUser(sub.student.userId);
                    }
                }
            }
            hw.submissions.push(sub);
        }

        return hw;
    }

    async submitHomework(data: {
        homeworkId: string;
        studentId: string;
        content?: string;
        fileUrl?: string;
    }) {
        // Check if already submitted
        const existingSnap = await db.collection('homeworkSubmissions')
            .where('homeworkId', '==', data.homeworkId)
            .where('studentId', '==', data.studentId)
            .limit(1)
            .get();

        let submissionDoc: any;
        if (!existingSnap.empty) {
            // Update existing
            const docRef = existingSnap.docs[0].ref;
            await docRef.update({
                content: data.content || null,
                fileUrl: data.fileUrl || null,
                submittedAt: new Date(),
            });
            const updated = await docRef.get();
            submissionDoc = { id: updated.id, ...updated.data() };
        } else {
            // Create new
            const docRef = await db.collection('homeworkSubmissions').add({
                homeworkId: data.homeworkId,
                studentId: data.studentId,
                content: data.content || null,
                fileUrl: data.fileUrl || null,
                submittedAt: new Date(),
                grade: null,
            });
            const created = await docRef.get();
            submissionDoc = { id: created.id, ...created.data() };
        }

        // Fetch related data
        const hwDoc = await db.collection('homework').doc(data.homeworkId).get();
        submissionDoc.homework = hwDoc.exists ? { id: hwDoc.id, ...hwDoc.data() } : null;

        const studentDoc = await db.collection('students').doc(data.studentId).get();
        if (studentDoc.exists) {
            submissionDoc.student = { id: studentDoc.id, ...studentDoc.data() } as any;
            if (submissionDoc.student.userId) {
                submissionDoc.student.user = await fetchUser(submissionDoc.student.userId);
            }
        }

        return submissionDoc;
    }

    async gradeHomework(submissionId: string, grade: string) {
        const docRef = db.collection('homeworkSubmissions').doc(submissionId);
        await docRef.update({ grade });
        const doc = await docRef.get();
        const submission = { id: doc.id, ...doc.data() } as any;

        // Fetch homework
        if (submission.homeworkId) {
            const hwDoc = await db.collection('homework').doc(submission.homeworkId).get();
            submission.homework = hwDoc.exists ? { id: hwDoc.id, ...hwDoc.data() } : null;
        }

        // Fetch student
        if (submission.studentId) {
            const studentDoc = await db.collection('students').doc(submission.studentId).get();
            if (studentDoc.exists) {
                submission.student = { id: studentDoc.id, ...studentDoc.data() } as any;
                if (submission.student.userId) {
                    submission.student.user = await fetchUser(submission.student.userId);
                }
            }
        }

        return submission;
    }

    async getStudentHomework(studentId: string) {
        // Get submissions
        const subsSnap = await db.collection('homeworkSubmissions')
            .where('studentId', '==', studentId)
            .orderBy('submittedAt', 'desc')
            .get();

        const submissions: any[] = [];
        for (const doc of subsSnap.docs) {
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
            submissions.push(sub);
        }

        // Get all homework with this student's submissions
        const allHwSnap = await db.collection('homework').orderBy('dueDate', 'desc').get();
        const allHomework: any[] = [];
        for (const doc of allHwSnap.docs) {
            const hw = { id: doc.id, ...doc.data() } as any;
            if (hw.subjectId) {
                hw.subject = await fetchSubject(hw.subjectId);
            }
            // Get this student's submissions for this homework
            const studentSubsSnap = await db.collection('homeworkSubmissions')
                .where('homeworkId', '==', doc.id)
                .where('studentId', '==', studentId)
                .get();
            hw.submissions = studentSubsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            allHomework.push(hw);
        }

        return { submissions, allHomework };
    }

    async getHomeworkSubmissions(homeworkId: string) {
        const snap = await db.collection('homeworkSubmissions')
            .where('homeworkId', '==', homeworkId)
            .orderBy('submittedAt', 'desc')
            .get();

        const results: any[] = [];
        for (const doc of snap.docs) {
            const sub = { id: doc.id, ...doc.data() } as any;
            if (sub.studentId) {
                const studentDoc = await db.collection('students').doc(sub.studentId).get();
                if (studentDoc.exists) {
                    sub.student = { id: studentDoc.id, ...studentDoc.data() } as any;
                    if (sub.student.userId) {
                        sub.student.user = await fetchUser(sub.student.userId);
                    }
                }
            }
            results.push(sub);
        }
        return results;
    }
}
