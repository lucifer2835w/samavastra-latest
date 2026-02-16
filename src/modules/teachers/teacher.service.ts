import { db } from '../../config/firebase';

export class TeacherService {
    async createTeacher(data: {
        userId: string;
        employeeId: string;
        qualification?: string;
    }) {
        const docRef = await db.collection('teachers').add({
            userId: data.userId,
            employeeId: data.employeeId,
            qualification: data.qualification || null,
        });
        const doc = await docRef.get();
        const teacher = { id: doc.id, ...doc.data() } as any;

        // Fetch user
        const userDoc = await db.collection('users').doc(data.userId).get();
        teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;

        return teacher;
    }

    async getTeacherById(id: string) {
        const doc = await db.collection('teachers').doc(id).get();
        if (!doc.exists) return null;
        const teacher = { id: doc.id, ...doc.data() } as any;

        // Fetch user
        if (teacher.userId) {
            const userDoc = await db.collection('users').doc(teacher.userId).get();
            teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
        }

        // Fetch classes where this teacher is assigned
        const classesSnap = await db.collection('classes').where('teacherId', '==', id).get();
        teacher.classes = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Fetch subjects assigned to this teacher
        const subjectsSnap = await db.collection('teacherSubjects').where('teacherId', '==', id).get();
        const subjectIds = subjectsSnap.docs.map(d => d.data().subjectId);
        teacher.subjects = [];
        for (const subjectId of subjectIds) {
            const subDoc = await db.collection('subjects').doc(subjectId).get();
            if (subDoc.exists) {
                teacher.subjects.push({ id: subDoc.id, ...subDoc.data() });
            }
        }

        return teacher;
    }

    async getTeacherByUserId(userId: string) {
        const snap = await db.collection('teachers').where('userId', '==', userId).limit(1).get();
        if (snap.empty) return null;

        const doc = snap.docs[0];
        const teacher = { id: doc.id, ...doc.data() } as any;

        // Fetch user
        const userDoc = await db.collection('users').doc(userId).get();
        teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;

        // Fetch classes
        const classesSnap = await db.collection('classes').where('teacherId', '==', teacher.id).get();
        teacher.classes = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Fetch subjects
        const subjectsSnap = await db.collection('teacherSubjects').where('teacherId', '==', teacher.id).get();
        teacher.subjects = [];
        for (const subDoc of subjectsSnap.docs) {
            const subjectDoc = await db.collection('subjects').doc(subDoc.data().subjectId).get();
            if (subjectDoc.exists) {
                teacher.subjects.push({ id: subjectDoc.id, ...subjectDoc.data() });
            }
        }

        return teacher;
    }

    async getAllTeachers(page: number = 1, limit: number = 20) {
        // Firestore doesn't have skip/offset natively, so we fetch all and paginate in memory
        const snap = await db.collection('teachers').get();
        const allTeachers: any[] = [];

        for (const doc of snap.docs) {
            const teacher = { id: doc.id, ...doc.data() } as any;
            // Fetch user
            if (teacher.userId) {
                const userDoc = await db.collection('users').doc(teacher.userId).get();
                teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
            }
            // Fetch classes
            const classesSnap = await db.collection('classes').where('teacherId', '==', teacher.id).get();
            teacher.classes = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

            // Fetch subjects
            const subjectsSnap = await db.collection('teacherSubjects').where('teacherId', '==', teacher.id).get();
            teacher.subjects = [];
            for (const subDoc of subjectsSnap.docs) {
                const subjectDoc = await db.collection('subjects').doc(subDoc.data().subjectId).get();
                if (subjectDoc.exists) {
                    teacher.subjects.push({ id: subjectDoc.id, ...subjectDoc.data() });
                }
            }

            allTeachers.push(teacher);
        }

        // Sort by lastName
        allTeachers.sort((a, b) => {
            const aName = a.user?.lastName || '';
            const bName = b.user?.lastName || '';
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

    async updateTeacher(id: string, data: {
        qualification?: string;
    }) {
        const docRef = db.collection('teachers').doc(id);
        await docRef.update(data);
        const doc = await docRef.get();
        const teacher = { id: doc.id, ...doc.data() } as any;

        // Fetch user
        if (teacher.userId) {
            const userDoc = await db.collection('users').doc(teacher.userId).get();
            teacher.user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
        }

        return teacher;
    }
}
