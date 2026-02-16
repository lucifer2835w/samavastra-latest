import { db } from '../../config/firebase';
import { FieldValue } from 'firebase-admin/firestore';

// Helper to fetch user doc
async function fetchUser(userId: string) {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

// Helper to fetch class doc
async function fetchClass(classId: string) {
    const doc = await db.collection('classes').doc(classId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export class StudentService {
    async createStudent(data: {
        userId: string;
        studentNumber: string;
        classId?: string;
        parentId?: string;
        status?: string;
    }) {
        const docRef = await db.collection('students').add({
            userId: data.userId,
            studentNumber: data.studentNumber,
            classId: data.classId || null,
            parentId: data.parentId || null,
            status: data.status || 'ACTIVE',
        });
        const doc = await docRef.get();
        const student = { id: doc.id, ...doc.data() } as any;

        student.user = await fetchUser(data.userId);
        student.class = data.classId ? await fetchClass(data.classId) : null;

        return student;
    }

    async createStudentWithUser(data: {
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        studentNumber: string;
        classId?: string;
        parentId?: string;
        phone?: string | null;
    }) {
        // Use Firestore transaction
        return db.runTransaction(async (transaction) => {
            // 1. Check for STUDENT role
            const rolesSnap = await db.collection('roles').where('name', '==', 'STUDENT').limit(1).get();
            if (rolesSnap.empty) {
                throw new Error('Student role not found');
            }
            const studentRoleId = rolesSnap.docs[0].id;

            // 2. Create User
            const userRef = db.collection('users').doc();
            transaction.set(userRef, {
                email: data.email,
                passwordHash: data.passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone || null,
                isActive: true,
                departmentId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // 3. Assign Role
            const userRoleRef = db.collection('userRoles').doc();
            transaction.set(userRoleRef, {
                userId: userRef.id,
                roleId: studentRoleId,
            });

            // 4. Create Student Profile
            const studentRef = db.collection('students').doc();
            transaction.set(studentRef, {
                userId: userRef.id,
                studentNumber: data.studentNumber,
                classId: data.classId || null,
                parentId: data.parentId || null,
                status: 'ACTIVE',
            });

            return {
                id: studentRef.id,
                userId: userRef.id,
                studentNumber: data.studentNumber,
                classId: data.classId || null,
                parentId: data.parentId || null,
                status: 'ACTIVE',
                user: {
                    id: userRef.id,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone || null,
                    isActive: true,
                },
                class: null as any, // Will be populated if classId is provided
            };
        });
    }

    async getStudentById(id: string) {
        const doc = await db.collection('students').doc(id).get();
        if (!doc.exists) return null;
        const student = { id: doc.id, ...doc.data() } as any;

        student.user = student.userId ? await fetchUser(student.userId) : null;
        student.class = student.classId ? await fetchClass(student.classId) : null;

        // Fetch parent
        if (student.parentId) {
            const parentDoc = await db.collection('parents').doc(student.parentId).get();
            if (parentDoc.exists) {
                const parent = { id: parentDoc.id, ...parentDoc.data() } as any;
                if (parent.userId) {
                    parent.user = await fetchUser(parent.userId);
                }
                student.parent = parent;
            }
        }

        return student;
    }

    async getStudentByUserId(userId: string) {
        const snap = await db.collection('students').where('userId', '==', userId).limit(1).get();
        if (snap.empty) return null;

        const doc = snap.docs[0];
        const student = { id: doc.id, ...doc.data() } as any;

        student.user = await fetchUser(userId);
        student.class = student.classId ? await fetchClass(student.classId) : null;

        return student;
    }

    async getAllStudents(page: number = 1, limit: number = 20, classId?: string) {
        let query: FirebaseFirestore.Query = db.collection('students');

        if (classId) {
            query = query.where('classId', '==', classId);
        }

        const snap = await query.get();
        const allStudents: any[] = [];

        for (const doc of snap.docs) {
            const student = { id: doc.id, ...doc.data() } as any;
            student.user = student.userId ? await fetchUser(student.userId) : null;
            student.class = student.classId ? await fetchClass(student.classId) : null;
            allStudents.push(student);
        }

        // Sort by lastName
        allStudents.sort((a, b) => {
            const aName = a.user?.lastName || '';
            const bName = b.user?.lastName || '';
            return aName.localeCompare(bName);
        });

        const total = allStudents.length;
        const start = (page - 1) * limit;
        const students = allStudents.slice(start, start + limit);

        return {
            students,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async updateStudent(id: string, data: {
        classId?: string;
        parentId?: string;
        status?: string;
    }) {
        const docRef = db.collection('students').doc(id);
        const updateData: any = {};
        if (data.classId !== undefined) updateData.classId = data.classId;
        if (data.parentId !== undefined) updateData.parentId = data.parentId;
        if (data.status !== undefined) updateData.status = data.status;

        await docRef.update(updateData);
        const doc = await docRef.get();
        const student = { id: doc.id, ...doc.data() } as any;

        student.user = student.userId ? await fetchUser(student.userId) : null;
        student.class = student.classId ? await fetchClass(student.classId) : null;

        return student;
    }
}
