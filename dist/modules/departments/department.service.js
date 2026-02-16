"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const firebase_1 = require("../../config/firebase");
class DepartmentService {
    async createDepartment(data) {
        const docRef = await firebase_1.db.collection('departments').add({
            name: data.name,
            code: data.code,
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
    async getAllDepartments() {
        const snap = await firebase_1.db.collection('departments').orderBy('name', 'asc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async getDepartmentById(id) {
        const doc = await firebase_1.db.collection('departments').doc(id).get();
        if (!doc.exists)
            return null;
        const dept = { id: doc.id, ...doc.data() };
        // Fetch users in this department
        const usersSnap = await firebase_1.db.collection('users').where('departmentId', '==', id).get();
        dept.users = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        return dept;
    }
}
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map