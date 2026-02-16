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

export class AcademicsService {
    // --- Classes ---
    async createClass(data: { grade: string; section: string; teacherId?: string }) {
        const docRef = await db.collection('classes').add({
            grade: data.grade,
            section: data.section,
            teacherId: data.teacherId || null,
        });
        const doc = await docRef.get();
        const cls = { id: doc.id, ...doc.data() } as any;

        // Fetch teacher info
        if (cls.teacherId) {
            const teacherDoc = await db.collection('teachers').doc(cls.teacherId).get();
            if (teacherDoc.exists) {
                cls.teacher = { id: teacherDoc.id, ...teacherDoc.data() } as any;
                if (cls.teacher.userId) {
                    cls.teacher.user = await fetchUser(cls.teacher.userId);
                }
            }
        }
        return cls;
    }

    async getAllClasses() {
        const snap = await db.collection('classes').orderBy('grade', 'asc').get();
        const classes: any[] = [];

        for (const doc of snap.docs) {
            const cls = { id: doc.id, ...doc.data() } as any;

            // Fetch teacher
            if (cls.teacherId) {
                const teacherDoc = await db.collection('teachers').doc(cls.teacherId).get();
                if (teacherDoc.exists) {
                    cls.teacher = { id: teacherDoc.id, ...teacherDoc.data() } as any;
                    if (cls.teacher.userId) {
                        cls.teacher.user = await fetchUser(cls.teacher.userId);
                    }
                }
            }

            // Count students in this class
            const studentsSnap = await db.collection('students').where('classId', '==', doc.id).get();
            cls._count = { students: studentsSnap.size };

            classes.push(cls);
        }

        return classes;
    }

    async getClassById(id: string) {
        const doc = await db.collection('classes').doc(id).get();
        if (!doc.exists) return null;
        const cls = { id: doc.id, ...doc.data() } as any;

        // Fetch teacher
        if (cls.teacherId) {
            const teacherDoc = await db.collection('teachers').doc(cls.teacherId).get();
            if (teacherDoc.exists) {
                cls.teacher = { id: teacherDoc.id, ...teacherDoc.data() } as any;
                if (cls.teacher.userId) {
                    cls.teacher.user = await fetchUser(cls.teacher.userId);
                }
            }
        }

        // Fetch students
        const studentsSnap = await db.collection('students').where('classId', '==', id).get();
        cls.students = [];
        for (const studentDoc of studentsSnap.docs) {
            const student = { id: studentDoc.id, ...studentDoc.data() } as any;
            if (student.userId) {
                student.user = await fetchUser(student.userId);
            }
            cls.students.push(student);
        }

        // Fetch subjects assigned to this class
        const classSubjectsSnap = await db.collection('classSubjects').where('classId', '==', id).get();
        cls.subjects = [];
        for (const csDoc of classSubjectsSnap.docs) {
            const subject = await fetchSubject(csDoc.data().subjectId);
            if (subject) cls.subjects.push(subject);
        }

        return cls;
    }

    // --- Subjects ---
    async createSubject(data: { name: string; code: string; description?: string }) {
        const docRef = await db.collection('subjects').add({
            name: data.name,
            code: data.code,
            description: data.description || null,
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }

    async getAllSubjects() {
        const snap = await db.collection('subjects').orderBy('name', 'asc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async assignSubjectToTeacher(subjectId: string, teacherId: string) {
        // Add to teacherSubjects join collection
        await db.collection('teacherSubjects').add({
            subjectId,
            teacherId,
        });
        const doc = await db.collection('subjects').doc(subjectId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    async assignSubjectToClass(subjectId: string, classId: string) {
        // Add to classSubjects join collection
        await db.collection('classSubjects').add({
            subjectId,
            classId,
        });
        const doc = await db.collection('classes').doc(classId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    // --- Exams ---
    async createExam(data: { subjectId: string; name: string; date: Date; maxMarks: number }) {
        const docRef = await db.collection('exams').add({
            subjectId: data.subjectId,
            name: data.name,
            date: data.date,
            maxMarks: data.maxMarks,
        });
        const doc = await docRef.get();
        const exam = { id: doc.id, ...doc.data() } as any;
        exam.subject = await fetchSubject(data.subjectId);
        return exam;
    }

    async getExamsBySubject(subjectId: string) {
        const snap = await db.collection('exams')
            .where('subjectId', '==', subjectId)
            .orderBy('date', 'desc')
            .get();

        const exams: any[] = [];
        for (const doc of snap.docs) {
            const exam = { id: doc.id, ...doc.data() } as any;
            exam.subject = await fetchSubject(subjectId);

            // Fetch results
            const resultsSnap = await db.collection('examResults').where('examId', '==', doc.id).get();
            exam.results = [];
            for (const rDoc of resultsSnap.docs) {
                const result = { id: rDoc.id, ...rDoc.data() } as any;
                if (result.studentId) {
                    const studentDoc = await db.collection('students').doc(result.studentId).get();
                    if (studentDoc.exists) {
                        result.student = { id: studentDoc.id, ...studentDoc.data() } as any;
                        if (result.student.userId) {
                            result.student.user = await fetchUser(result.student.userId);
                        }
                    }
                }
                exam.results.push(result);
            }
            exams.push(exam);
        }
        return exams;
    }

    async recordExamResult(data: { examId: string; studentId: string; marksObtained: number; grade?: string }) {
        // Check if result already exists (upsert logic)
        const existingSnap = await db.collection('examResults')
            .where('examId', '==', data.examId)
            .where('studentId', '==', data.studentId)
            .limit(1)
            .get();

        let resultDoc: any;
        if (!existingSnap.empty) {
            // Update
            const docRef = existingSnap.docs[0].ref;
            await docRef.update({
                marksObtained: data.marksObtained,
                grade: data.grade || null,
            });
            const updated = await docRef.get();
            resultDoc = { id: updated.id, ...updated.data() };
        } else {
            // Create
            const docRef = await db.collection('examResults').add({
                examId: data.examId,
                studentId: data.studentId,
                marksObtained: data.marksObtained,
                grade: data.grade || null,
            });
            const created = await docRef.get();
            resultDoc = { id: created.id, ...created.data() };
        }

        // Fetch related data
        const examDoc = await db.collection('exams').doc(data.examId).get();
        if (examDoc.exists) {
            resultDoc.exam = { id: examDoc.id, ...examDoc.data() } as any;
            if (resultDoc.exam.subjectId) {
                resultDoc.exam.subject = await fetchSubject(resultDoc.exam.subjectId);
            }
        }
        const studentDoc = await db.collection('students').doc(data.studentId).get();
        if (studentDoc.exists) {
            resultDoc.student = { id: studentDoc.id, ...studentDoc.data() } as any;
            if (resultDoc.student.userId) {
                resultDoc.student.user = await fetchUser(resultDoc.student.userId);
            }
        }

        return resultDoc;
    }

    // --- Attendance ---
    async recordAttendance(data: { studentId: string; date: Date; status: string; remarks?: string }) {
        // Upsert: check if attendance already exists for this student+date
        const dateStr = data.date.toISOString().split('T')[0]; // Use date string for comparison
        const existingSnap = await db.collection('attendance')
            .where('studentId', '==', data.studentId)
            .where('dateStr', '==', dateStr)
            .limit(1)
            .get();

        let attendanceDoc: any;
        if (!existingSnap.empty) {
            const docRef = existingSnap.docs[0].ref;
            await docRef.update({
                status: data.status,
                remarks: data.remarks || null,
            });
            const updated = await docRef.get();
            attendanceDoc = { id: updated.id, ...updated.data() };
        } else {
            const docRef = await db.collection('attendance').add({
                studentId: data.studentId,
                date: data.date,
                dateStr, // Store string version for easy querying
                status: data.status,
                remarks: data.remarks || null,
            });
            const created = await docRef.get();
            attendanceDoc = { id: created.id, ...created.data() };
        }

        // Fetch student
        const studentDoc = await db.collection('students').doc(data.studentId).get();
        if (studentDoc.exists) {
            attendanceDoc.student = { id: studentDoc.id, ...studentDoc.data() } as any;
            if (attendanceDoc.student.userId) {
                attendanceDoc.student.user = await fetchUser(attendanceDoc.student.userId);
            }
        }

        return attendanceDoc;
    }

    async getAttendanceByClass(classId: string, startDate?: Date, endDate?: Date) {
        // Get students in this class
        const studentsSnap = await db.collection('students').where('classId', '==', classId).get();
        const studentIds = studentsSnap.docs.map(d => d.id);

        if (studentIds.length === 0) return [];

        // Firestore 'in' queries support max 30 items
        const allAttendance: any[] = [];
        const chunks = [];
        for (let i = 0; i < studentIds.length; i += 30) {
            chunks.push(studentIds.slice(i, i + 30));
        }

        for (const chunk of chunks) {
            let query: FirebaseFirestore.Query = db.collection('attendance')
                .where('studentId', 'in', chunk);

            if (startDate) {
                query = query.where('date', '>=', startDate);
            }
            if (endDate) {
                query = query.where('date', '<=', endDate);
            }

            const snap = await query.get();
            for (const doc of snap.docs) {
                const att = { id: doc.id, ...doc.data() } as any;
                // Find student data from our already-fetched list
                const studentDoc = studentsSnap.docs.find(s => s.id === att.studentId);
                if (studentDoc) {
                    att.student = { id: studentDoc.id, ...studentDoc.data() } as any;
                    if (att.student.userId) {
                        att.student.user = await fetchUser(att.student.userId);
                    }
                }
                allAttendance.push(att);
            }
        }

        // Sort by date desc, then student lastName asc
        allAttendance.sort((a, b) => {
            const aDate = a.date?.toDate?.() || a.date;
            const bDate = b.date?.toDate?.() || b.date;
            const dateDiff = new Date(bDate).getTime() - new Date(aDate).getTime();
            if (dateDiff !== 0) return dateDiff;
            return (a.student?.user?.lastName || '').localeCompare(b.student?.user?.lastName || '');
        });

        return allAttendance;
    }

    // --- Student Performance ---
    async getStudentPerformance(studentId: string) {
        // Fetch Exam Results
        const resultsSnap = await db.collection('examResults').where('studentId', '==', studentId).get();
        const examResults: any[] = [];

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
            examResults.push(result);
        }

        // Fetch Attendance Stats
        const attendanceSnap = await db.collection('attendance').where('studentId', '==', studentId).get();
        const statusCounts: any = { present: 0, absent: 0, late: 0, excused: 0 };
        attendanceSnap.docs.forEach(doc => {
            const status = (doc.data().status || '').toLowerCase();
            if (statusCounts[status] !== undefined) {
                statusCounts[status]++;
            }
        });

        const totalDays = attendanceSnap.size;
        const attendancePercentage = totalDays > 0 ? Math.round((statusCounts.present / totalDays) * 100) : 0;

        return {
            examResults: examResults.map(r => ({
                subject: r.exam?.subject?.name || 'Unknown',
                exam: r.exam?.name || 'Unknown',
                marks: r.marksObtained,
                maxMarks: r.exam?.maxMarks || 0,
                grade: r.grade,
            })),
            attendance: {
                present: statusCounts.present,
                total: totalDays,
                percentage: attendancePercentage,
            },
        };
    }
}
