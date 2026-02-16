import { db } from '../../config/firebase';

export class DepartmentService {
    async createDepartment(data: { name: string; code: string }) {
        const docRef = await db.collection('departments').add({
            name: data.name,
            code: data.code,
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }

    async getAllDepartments() {
        const snap = await db.collection('departments').orderBy('name', 'asc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getDepartmentById(id: string) {
        const doc = await db.collection('departments').doc(id).get();
        if (!doc.exists) return null;

        const dept = { id: doc.id, ...doc.data() } as any;

        // Fetch users in this department
        const usersSnap = await db.collection('users').where('departmentId', '==', id).get();
        dept.users = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        return dept;
    }
}
