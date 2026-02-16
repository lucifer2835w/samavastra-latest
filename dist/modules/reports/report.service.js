"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const firebase_1 = require("../../config/firebase");
// Helpers
async function fetchUser(userId) {
    const doc = await firebase_1.db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchSubject(subjectId) {
    const doc = await firebase_1.db.collection('subjects').doc(subjectId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchClass(classId) {
    const doc = await firebase_1.db.collection('classes').doc(classId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
// Stat Helpers
function calculateAttendanceStats(records) {
    const total = records.length;
    const present = records.filter(r => r.status === 'PRESENT').length;
    const absent = records.filter(r => r.status === 'ABSENT').length;
    const late = records.filter(r => r.status === 'LATE').length;
    const excused = records.filter(r => r.status === 'EXCUSED').length;
    return {
        total,
        present,
        absent,
        late,
        excused,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0,
    };
}
function calculateGradeStats(results) {
    if (results.length === 0)
        return { averageMarks: 0, totalExams: 0, highestMarks: 0, lowestMarks: 0 };
    const marks = results.map(r => Number(r.marksObtained || 0));
    return {
        totalExams: marks.length,
        averageMarks: Math.round(marks.reduce((a, b) => a + b, 0) / marks.length),
        highestMarks: Math.max(...marks),
        lowestMarks: Math.min(...marks),
    };
}
function calculateFeeStats(fees) {
    let total = 0, paid = 0, pending = 0, overdue = 0;
    fees.forEach(f => {
        const amount = Number(f.amount || 0);
        total += amount;
        switch (f.status) {
            case 'PAID':
                paid += amount;
                break;
            case 'PENDING':
                pending += amount;
                break;
            case 'OVERDUE':
                overdue += amount;
                break;
        }
    });
    return { total, paid, pending, overdue };
}
class ReportService {
    async getStudentReportCard(studentId) {
        // Get student
        const studentDoc = await firebase_1.db.collection('students').doc(studentId).get();
        if (!studentDoc.exists)
            throw new Error('Student not found');
        const student = { id: studentDoc.id, ...studentDoc.data() };
        if (student.userId)
            student.user = await fetchUser(student.userId);
        if (student.classId)
            student.class = await fetchClass(student.classId);
        // Exam Results
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
        // Attendance
        const attSnap = await firebase_1.db.collection('attendance').where('studentId', '==', studentId).get();
        const attendance = attSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Fees
        const feesSnap = await firebase_1.db.collection('fees').where('studentId', '==', studentId).get();
        const fees = feesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        return {
            student,
            grades: calculateGradeStats(examResults),
            examResults: examResults.map(r => {
                var _a, _b, _c, _d;
                return ({
                    exam: (_a = r.exam) === null || _a === void 0 ? void 0 : _a.name,
                    subject: (_c = (_b = r.exam) === null || _b === void 0 ? void 0 : _b.subject) === null || _c === void 0 ? void 0 : _c.name,
                    marks: r.marksObtained,
                    maxMarks: ((_d = r.exam) === null || _d === void 0 ? void 0 : _d.maxMarks) || 0,
                    grade: r.grade,
                });
            }),
            attendance: calculateAttendanceStats(attendance),
            fees: calculateFeeStats(fees),
        };
    }
    async getClassPerformanceReport(classId) {
        var _a, _b;
        // Get class
        const classDoc = await firebase_1.db.collection('classes').doc(classId).get();
        if (!classDoc.exists)
            throw new Error('Class not found');
        const cls = { id: classDoc.id, ...classDoc.data() };
        // Get students
        const studentsSnap = await firebase_1.db.collection('students').where('classId', '==', classId).get();
        const studentReports = [];
        for (const sDoc of studentsSnap.docs) {
            const student = { id: sDoc.id, ...sDoc.data() };
            if (student.userId)
                student.user = await fetchUser(student.userId);
            // Exam results for this student
            const resultsSnap = await firebase_1.db.collection('examResults').where('studentId', '==', sDoc.id).get();
            const results = resultsSnap.docs.map(d => d.data());
            // Attendance
            const attSnap = await firebase_1.db.collection('attendance').where('studentId', '==', sDoc.id).get();
            const attendance = attSnap.docs.map(d => d.data());
            studentReports.push({
                student: {
                    id: student.id,
                    name: `${((_a = student.user) === null || _a === void 0 ? void 0 : _a.firstName) || ''} ${((_b = student.user) === null || _b === void 0 ? void 0 : _b.lastName) || ''}`.trim(),
                    studentNumber: student.studentNumber,
                },
                grades: calculateGradeStats(results),
                attendance: calculateAttendanceStats(attendance),
            });
        }
        return {
            class: cls,
            totalStudents: studentsSnap.size,
            students: studentReports,
        };
    }
    async getAttendanceReport(classId, startDate, endDate) {
        let studentIds = [];
        if (classId) {
            const studentsSnap = await firebase_1.db.collection('students').where('classId', '==', classId).get();
            studentIds = studentsSnap.docs.map(d => d.id);
        }
        let query = firebase_1.db.collection('attendance');
        if (startDate)
            query = query.where('date', '>=', startDate);
        if (endDate)
            query = query.where('date', '<=', endDate);
        const attSnap = await query.get();
        let records = attSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Filter by class students if classId provided
        if (classId && studentIds.length > 0) {
            records = records.filter((r) => studentIds.includes(r.studentId));
        }
        return {
            stats: calculateAttendanceStats(records),
            totalRecords: records.length,
        };
    }
    async getFeeCollectionReport(startDate, endDate) {
        let query = firebase_1.db.collection('fees');
        const feesSnap = await query.get();
        let fees = feesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Filter by date range on dueDate
        if (startDate) {
            fees = fees.filter(f => {
                var _a, _b;
                const dueDate = ((_b = (_a = f.dueDate) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) || f.dueDate;
                return new Date(dueDate) >= startDate;
            });
        }
        if (endDate) {
            fees = fees.filter(f => {
                var _a, _b;
                const dueDate = ((_b = (_a = f.dueDate) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) || f.dueDate;
                return new Date(dueDate) <= endDate;
            });
        }
        return {
            stats: calculateFeeStats(fees),
            totalRecords: fees.length,
            byStatus: {
                paid: fees.filter(f => f.status === 'PAID').length,
                pending: fees.filter(f => f.status === 'PENDING').length,
                overdue: fees.filter(f => f.status === 'OVERDUE').length,
            },
        };
    }
    async getTeacherWorkloadReport() {
        var _a, _b;
        const teachersSnap = await firebase_1.db.collection('teachers').get();
        const reports = [];
        for (const tDoc of teachersSnap.docs) {
            const teacher = { id: tDoc.id, ...tDoc.data() };
            if (teacher.userId)
                teacher.user = await fetchUser(teacher.userId);
            // Classes
            const classesSnap = await firebase_1.db.collection('classes').where('teacherId', '==', tDoc.id).get();
            const classes = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Subject assignments
            const subjectsSnap = await firebase_1.db.collection('teacherSubjects').where('teacherId', '==', tDoc.id).get();
            const subjects = [];
            for (const sDoc of subjectsSnap.docs) {
                const subject = await fetchSubject(sDoc.data().subjectId);
                if (subject)
                    subjects.push(subject);
            }
            // Count students across all classes
            let studentCount = 0;
            for (const cls of classes) {
                const studentsSnap = await firebase_1.db.collection('students').where('classId', '==', cls.id).get();
                studentCount += studentsSnap.size;
            }
            reports.push({
                teacher: {
                    id: teacher.id,
                    name: `${((_a = teacher.user) === null || _a === void 0 ? void 0 : _a.firstName) || ''} ${((_b = teacher.user) === null || _b === void 0 ? void 0 : _b.lastName) || ''}`.trim(),
                    qualification: teacher.qualification,
                },
                classes: classes.length,
                subjects: subjects.length,
                totalStudents: studentCount,
            });
        }
        return reports;
    }
}
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map