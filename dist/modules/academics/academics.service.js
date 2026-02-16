"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicsService = void 0;
const firebase_1 = require("../../config/firebase");
// Helper functions
async function fetchUser(userId) {
    const doc = await firebase_1.db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchSubject(subjectId) {
    const doc = await firebase_1.db.collection('subjects').doc(subjectId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
class AcademicsService {
    // --- Classes ---
    async createClass(data) {
        const docRef = await firebase_1.db.collection('classes').add({
            grade: data.grade,
            section: data.section,
            teacherId: data.teacherId || null,
        });
        const doc = await docRef.get();
        const cls = { id: doc.id, ...doc.data() };
        // Fetch teacher info
        if (cls.teacherId) {
            const teacherDoc = await firebase_1.db.collection('teachers').doc(cls.teacherId).get();
            if (teacherDoc.exists) {
                cls.teacher = { id: teacherDoc.id, ...teacherDoc.data() };
                if (cls.teacher.userId) {
                    cls.teacher.user = await fetchUser(cls.teacher.userId);
                }
            }
        }
        return cls;
    }
    async getAllClasses() {
        const snap = await firebase_1.db.collection('classes').orderBy('grade', 'asc').get();
        const classes = [];
        for (const doc of snap.docs) {
            const cls = { id: doc.id, ...doc.data() };
            // Fetch teacher
            if (cls.teacherId) {
                const teacherDoc = await firebase_1.db.collection('teachers').doc(cls.teacherId).get();
                if (teacherDoc.exists) {
                    cls.teacher = { id: teacherDoc.id, ...teacherDoc.data() };
                    if (cls.teacher.userId) {
                        cls.teacher.user = await fetchUser(cls.teacher.userId);
                    }
                }
            }
            // Count students in this class
            const studentsSnap = await firebase_1.db.collection('students').where('classId', '==', doc.id).get();
            cls._count = { students: studentsSnap.size };
            classes.push(cls);
        }
        return classes;
    }
    async getClassById(id) {
        const doc = await firebase_1.db.collection('classes').doc(id).get();
        if (!doc.exists)
            return null;
        const cls = { id: doc.id, ...doc.data() };
        // Fetch teacher
        if (cls.teacherId) {
            const teacherDoc = await firebase_1.db.collection('teachers').doc(cls.teacherId).get();
            if (teacherDoc.exists) {
                cls.teacher = { id: teacherDoc.id, ...teacherDoc.data() };
                if (cls.teacher.userId) {
                    cls.teacher.user = await fetchUser(cls.teacher.userId);
                }
            }
        }
        // Fetch students
        const studentsSnap = await firebase_1.db.collection('students').where('classId', '==', id).get();
        cls.students = [];
        for (const studentDoc of studentsSnap.docs) {
            const student = { id: studentDoc.id, ...studentDoc.data() };
            if (student.userId) {
                student.user = await fetchUser(student.userId);
            }
            cls.students.push(student);
        }
        // Fetch subjects assigned to this class
        const classSubjectsSnap = await firebase_1.db.collection('classSubjects').where('classId', '==', id).get();
        cls.subjects = [];
        for (const csDoc of classSubjectsSnap.docs) {
            const subject = await fetchSubject(csDoc.data().subjectId);
            if (subject)
                cls.subjects.push(subject);
        }
        return cls;
    }
    // --- Subjects ---
    async createSubject(data) {
        const docRef = await firebase_1.db.collection('subjects').add({
            name: data.name,
            code: data.code,
            description: data.description || null,
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
    async getAllSubjects() {
        const snap = await firebase_1.db.collection('subjects').orderBy('name', 'asc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async assignSubjectToTeacher(subjectId, teacherId) {
        // Add to teacherSubjects join collection
        await firebase_1.db.collection('teacherSubjects').add({
            subjectId,
            teacherId,
        });
        const doc = await firebase_1.db.collection('subjects').doc(subjectId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }
    async assignSubjectToClass(subjectId, classId) {
        // Add to classSubjects join collection
        await firebase_1.db.collection('classSubjects').add({
            subjectId,
            classId,
        });
        const doc = await firebase_1.db.collection('classes').doc(classId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }
    // --- Exams ---
    async createExam(data) {
        const docRef = await firebase_1.db.collection('exams').add({
            subjectId: data.subjectId,
            name: data.name,
            date: data.date,
            maxMarks: data.maxMarks,
        });
        const doc = await docRef.get();
        const exam = { id: doc.id, ...doc.data() };
        exam.subject = await fetchSubject(data.subjectId);
        return exam;
    }
    async getExamsBySubject(subjectId) {
        const snap = await firebase_1.db.collection('exams')
            .where('subjectId', '==', subjectId)
            .orderBy('date', 'desc')
            .get();
        const exams = [];
        for (const doc of snap.docs) {
            const exam = { id: doc.id, ...doc.data() };
            exam.subject = await fetchSubject(subjectId);
            // Fetch results
            const resultsSnap = await firebase_1.db.collection('examResults').where('examId', '==', doc.id).get();
            exam.results = [];
            for (const rDoc of resultsSnap.docs) {
                const result = { id: rDoc.id, ...rDoc.data() };
                if (result.studentId) {
                    const studentDoc = await firebase_1.db.collection('students').doc(result.studentId).get();
                    if (studentDoc.exists) {
                        result.student = { id: studentDoc.id, ...studentDoc.data() };
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
    async recordExamResult(data) {
        // Check if result already exists (upsert logic)
        const existingSnap = await firebase_1.db.collection('examResults')
            .where('examId', '==', data.examId)
            .where('studentId', '==', data.studentId)
            .limit(1)
            .get();
        let resultDoc;
        if (!existingSnap.empty) {
            // Update
            const docRef = existingSnap.docs[0].ref;
            await docRef.update({
                marksObtained: data.marksObtained,
                grade: data.grade || null,
            });
            const updated = await docRef.get();
            resultDoc = { id: updated.id, ...updated.data() };
        }
        else {
            // Create
            const docRef = await firebase_1.db.collection('examResults').add({
                examId: data.examId,
                studentId: data.studentId,
                marksObtained: data.marksObtained,
                grade: data.grade || null,
            });
            const created = await docRef.get();
            resultDoc = { id: created.id, ...created.data() };
        }
        // Fetch related data
        const examDoc = await firebase_1.db.collection('exams').doc(data.examId).get();
        if (examDoc.exists) {
            resultDoc.exam = { id: examDoc.id, ...examDoc.data() };
            if (resultDoc.exam.subjectId) {
                resultDoc.exam.subject = await fetchSubject(resultDoc.exam.subjectId);
            }
        }
        const studentDoc = await firebase_1.db.collection('students').doc(data.studentId).get();
        if (studentDoc.exists) {
            resultDoc.student = { id: studentDoc.id, ...studentDoc.data() };
            if (resultDoc.student.userId) {
                resultDoc.student.user = await fetchUser(resultDoc.student.userId);
            }
        }
        return resultDoc;
    }
    // --- Attendance ---
    async recordAttendance(data) {
        // Upsert: check if attendance already exists for this student+date
        const dateStr = data.date.toISOString().split('T')[0]; // Use date string for comparison
        const existingSnap = await firebase_1.db.collection('attendance')
            .where('studentId', '==', data.studentId)
            .where('dateStr', '==', dateStr)
            .limit(1)
            .get();
        let attendanceDoc;
        if (!existingSnap.empty) {
            const docRef = existingSnap.docs[0].ref;
            await docRef.update({
                status: data.status,
                remarks: data.remarks || null,
            });
            const updated = await docRef.get();
            attendanceDoc = { id: updated.id, ...updated.data() };
        }
        else {
            const docRef = await firebase_1.db.collection('attendance').add({
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
        const studentDoc = await firebase_1.db.collection('students').doc(data.studentId).get();
        if (studentDoc.exists) {
            attendanceDoc.student = { id: studentDoc.id, ...studentDoc.data() };
            if (attendanceDoc.student.userId) {
                attendanceDoc.student.user = await fetchUser(attendanceDoc.student.userId);
            }
        }
        return attendanceDoc;
    }
    async getAttendanceByClass(classId, startDate, endDate) {
        // Get students in this class
        const studentsSnap = await firebase_1.db.collection('students').where('classId', '==', classId).get();
        const studentIds = studentsSnap.docs.map(d => d.id);
        if (studentIds.length === 0)
            return [];
        // Firestore 'in' queries support max 30 items
        const allAttendance = [];
        const chunks = [];
        for (let i = 0; i < studentIds.length; i += 30) {
            chunks.push(studentIds.slice(i, i + 30));
        }
        for (const chunk of chunks) {
            let query = firebase_1.db.collection('attendance')
                .where('studentId', 'in', chunk);
            if (startDate) {
                query = query.where('date', '>=', startDate);
            }
            if (endDate) {
                query = query.where('date', '<=', endDate);
            }
            const snap = await query.get();
            for (const doc of snap.docs) {
                const att = { id: doc.id, ...doc.data() };
                // Find student data from our already-fetched list
                const studentDoc = studentsSnap.docs.find(s => s.id === att.studentId);
                if (studentDoc) {
                    att.student = { id: studentDoc.id, ...studentDoc.data() };
                    if (att.student.userId) {
                        att.student.user = await fetchUser(att.student.userId);
                    }
                }
                allAttendance.push(att);
            }
        }
        // Sort by date desc, then student lastName asc
        allAttendance.sort((a, b) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const aDate = ((_b = (_a = a.date) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) || a.date;
            const bDate = ((_d = (_c = b.date) === null || _c === void 0 ? void 0 : _c.toDate) === null || _d === void 0 ? void 0 : _d.call(_c)) || b.date;
            const dateDiff = new Date(bDate).getTime() - new Date(aDate).getTime();
            if (dateDiff !== 0)
                return dateDiff;
            return (((_f = (_e = a.student) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.lastName) || '').localeCompare(((_h = (_g = b.student) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.lastName) || '');
        });
        return allAttendance;
    }
    // --- Student Performance ---
    async getStudentPerformance(studentId) {
        // Fetch Exam Results
        const resultsSnap = await firebase_1.db.collection('examResults').where('studentId', '==', studentId).get();
        const examResults = [];
        for (const doc of resultsSnap.docs) {
            const result = { id: doc.id, ...doc.data() };
            if (result.examId) {
                const examDoc = await firebase_1.db.collection('exams').doc(result.examId).get();
                if (examDoc.exists) {
                    result.exam = { id: examDoc.id, ...examDoc.data() };
                    if (result.exam.subjectId) {
                        result.exam.subject = await fetchSubject(result.exam.subjectId);
                    }
                }
            }
            examResults.push(result);
        }
        // Fetch Attendance Stats
        const attendanceSnap = await firebase_1.db.collection('attendance').where('studentId', '==', studentId).get();
        const statusCounts = { present: 0, absent: 0, late: 0, excused: 0 };
        attendanceSnap.docs.forEach(doc => {
            const status = (doc.data().status || '').toLowerCase();
            if (statusCounts[status] !== undefined) {
                statusCounts[status]++;
            }
        });
        const totalDays = attendanceSnap.size;
        const attendancePercentage = totalDays > 0 ? Math.round((statusCounts.present / totalDays) * 100) : 0;
        return {
            examResults: examResults.map(r => {
                var _a, _b, _c, _d;
                return ({
                    subject: ((_b = (_a = r.exam) === null || _a === void 0 ? void 0 : _a.subject) === null || _b === void 0 ? void 0 : _b.name) || 'Unknown',
                    exam: ((_c = r.exam) === null || _c === void 0 ? void 0 : _c.name) || 'Unknown',
                    marks: r.marksObtained,
                    maxMarks: ((_d = r.exam) === null || _d === void 0 ? void 0 : _d.maxMarks) || 0,
                    grade: r.grade,
                });
            }),
            attendance: {
                present: statusCounts.present,
                total: totalDays,
                percentage: attendancePercentage,
            },
        };
    }
}
exports.AcademicsService = AcademicsService;
//# sourceMappingURL=academics.service.js.map