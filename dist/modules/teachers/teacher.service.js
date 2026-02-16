"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const firebase_1 = require("../../config/firebase");
class TeacherService {
    async createTeacher(data) {
        const docRef = await firebase_1.db.collection('teachers').add({
            userId: data.userId,
            employeeId: data.employeeId,
            qualification: data.qualification || null,
        });
        const doc = await docRef.get();
        const teacher = { id: doc.id, ...doc.data() };
        // Fetch user
        const userDoc = await firebase_1.db.collection('users').doc(data.userId).get();
        teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
        return teacher;
    }
    async getTeacherById(id) {
        const doc = await firebase_1.db.collection('teachers').doc(id).get();
        if (!doc.exists)
            return null;
        const teacher = { id: doc.id, ...doc.data() };
        // Fetch user
        if (teacher.userId) {
            const userDoc = await firebase_1.db.collection('users').doc(teacher.userId).get();
            teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
        }
        // Fetch classes where this teacher is assigned
        const classesSnap = await firebase_1.db.collection('classes').where('teacherId', '==', id).get();
        teacher.classes = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Fetch subjects assigned to this teacher
        const subjectsSnap = await firebase_1.db.collection('teacherSubjects').where('teacherId', '==', id).get();
        const subjectIds = subjectsSnap.docs.map(d => d.data().subjectId);
        teacher.subjects = [];
        for (const subjectId of subjectIds) {
            const subDoc = await firebase_1.db.collection('subjects').doc(subjectId).get();
            if (subDoc.exists) {
                teacher.subjects.push({ id: subDoc.id, ...subDoc.data() });
            }
        }
        return teacher;
    }
    async getTeacherByUserId(userId) {
        const snap = await firebase_1.db.collection('teachers').where('userId', '==', userId).limit(1).get();
        if (snap.empty)
            return null;
        const doc = snap.docs[0];
        const teacher = { id: doc.id, ...doc.data() };
        // Fetch user
        const userDoc = await firebase_1.db.collection('users').doc(userId).get();
        teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
        // Fetch classes
        const classesSnap = await firebase_1.db.collection('classes').where('teacherId', '==', teacher.id).get();
        teacher.classes = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Fetch subjects
        const subjectsSnap = await firebase_1.db.collection('teacherSubjects').where('teacherId', '==', teacher.id).get();
        teacher.subjects = [];
        for (const subDoc of subjectsSnap.docs) {
            const subjectDoc = await firebase_1.db.collection('subjects').doc(subDoc.data().subjectId).get();
            if (subjectDoc.exists) {
                teacher.subjects.push({ id: subjectDoc.id, ...subjectDoc.data() });
            }
        }
        return teacher;
    }
    async getAllTeachers(page = 1, limit = 20) {
        // Firestore doesn't have skip/offset natively, so we fetch all and paginate in memory
        const snap = await firebase_1.db.collection('teachers').get();
        const allTeachers = [];
        for (const doc of snap.docs) {
            const teacher = { id: doc.id, ...doc.data() };
            // Fetch user
            if (teacher.userId) {
                const userDoc = await firebase_1.db.collection('users').doc(teacher.userId).get();
                teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
            }
            // Fetch classes
            const classesSnap = await firebase_1.db.collection('classes').where('teacherId', '==', teacher.id).get();
            teacher.classes = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Fetch subjects
            const subjectsSnap = await firebase_1.db.collection('teacherSubjects').where('teacherId', '==', teacher.id).get();
            teacher.subjects = [];
            for (const subDoc of subjectsSnap.docs) {
                const subjectDoc = await firebase_1.db.collection('subjects').doc(subDoc.data().subjectId).get();
                if (subjectDoc.exists) {
                    teacher.subjects.push({ id: subjectDoc.id, ...subjectDoc.data() });
                }
            }
            allTeachers.push(teacher);
        }
        // Sort by lastName
        allTeachers.sort((a, b) => {
            var _a, _b;
            const aName = ((_a = a.user) === null || _a === void 0 ? void 0 : _a.lastName) || '';
            const bName = ((_b = b.user) === null || _b === void 0 ? void 0 : _b.lastName) || '';
            return aName.localeCompare(bName);
        });
        const total = allTeachers.length;
        const start = (page - 1) * limit;
        const teachers = allTeachers.slice(start, start + limit);
        return {
            teachers,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async updateTeacher(id, data) {
        const docRef = firebase_1.db.collection('teachers').doc(id);
        await docRef.update(data);
        const doc = await docRef.get();
        const teacher = { id: doc.id, ...doc.data() };
        // Fetch user
        if (teacher.userId) {
            const userDoc = await firebase_1.db.collection('users').doc(teacher.userId).get();
            teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
        }
        return teacher;
    }
}
exports.TeacherService = TeacherService;
//# sourceMappingURL=teacher.service.js.map