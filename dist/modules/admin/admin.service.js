"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const firebase_1 = require("../../config/firebase");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../config/env");
// Helpers
async function fetchUser(userId) {
    const doc = await firebase_1.db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchRoles(userId) {
    const snap = await firebase_1.db.collection('userRoles').where('userId', '==', userId).get();
    const roles = [];
    for (const doc of snap.docs) {
        const roleDoc = await firebase_1.db.collection('roles').doc(doc.data().roleId).get();
        if (roleDoc.exists) {
            roles.push({ id: roleDoc.id, ...roleDoc.data() });
        }
    }
    return roles;
}
class AdminService {
    // --- User Management ---
    async createUser(data) {
        const passwordHash = await bcrypt_1.default.hash(data.password, env_1.env.bcryptRounds);
        const userRef = firebase_1.db.collection('users').doc();
        await userRef.set({
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone || null,
            isActive: true,
            departmentId: data.departmentId || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // Assign roles
        if (data.roleNames && data.roleNames.length > 0) {
            for (const roleName of data.roleNames) {
                const roleSnap = await firebase_1.db.collection('roles').where('name', '==', roleName).limit(1).get();
                if (!roleSnap.empty) {
                    await firebase_1.db.collection('userRoles').add({
                        userId: userRef.id,
                        roleId: roleSnap.docs[0].id,
                    });
                }
            }
        }
        const user = await fetchUser(userRef.id);
        const roles = await fetchRoles(userRef.id);
        return { ...user, roles };
    }
    async getUserById(id) {
        const userDoc = await firebase_1.db.collection('users').doc(id).get();
        if (!userDoc.exists)
            return null;
        const user = { id: userDoc.id, ...userDoc.data() };
        user.roles = await fetchRoles(id);
        // Fetch profiles
        const studentSnap = await firebase_1.db.collection('students').where('userId', '==', id).limit(1).get();
        user.student = studentSnap.empty ? null : { id: studentSnap.docs[0].id, ...studentSnap.docs[0].data() };
        const teacherSnap = await firebase_1.db.collection('teachers').where('userId', '==', id).limit(1).get();
        user.teacher = teacherSnap.empty ? null : { id: teacherSnap.docs[0].id, ...teacherSnap.docs[0].data() };
        const parentSnap = await firebase_1.db.collection('parents').where('userId', '==', id).limit(1).get();
        user.parent = parentSnap.empty ? null : { id: parentSnap.docs[0].id, ...parentSnap.docs[0].data() };
        if (user.departmentId) {
            const deptDoc = await firebase_1.db.collection('departments').doc(user.departmentId).get();
            user.department = deptDoc.exists ? { id: deptDoc.id, ...deptDoc.data() } : null;
        }
        return user;
    }
    async getAllUsers(page = 1, limit = 20, search, role, departmentId, isActive) {
        const snap = await firebase_1.db.collection('users').get();
        let allUsers = [];
        for (const doc of snap.docs) {
            const user = { id: doc.id, ...doc.data() };
            user.roles = await fetchRoles(doc.id);
            // Fetch profiles
            const studentSnap = await firebase_1.db.collection('students').where('userId', '==', doc.id).limit(1).get();
            user.student = studentSnap.empty ? null : { id: studentSnap.docs[0].id, ...studentSnap.docs[0].data() };
            const teacherSnap = await firebase_1.db.collection('teachers').where('userId', '==', doc.id).limit(1).get();
            user.teacher = teacherSnap.empty ? null : { id: teacherSnap.docs[0].id, ...teacherSnap.docs[0].data() };
            const parentSnap = await firebase_1.db.collection('parents').where('userId', '==', doc.id).limit(1).get();
            user.parent = parentSnap.empty ? null : { id: parentSnap.docs[0].id, ...parentSnap.docs[0].data() };
            allUsers.push(user);
        }
        // Apply filters
        if (search) {
            const lowerSearch = search.toLowerCase();
            allUsers = allUsers.filter(u => (u.firstName || '').toLowerCase().includes(lowerSearch) ||
                (u.lastName || '').toLowerCase().includes(lowerSearch) ||
                (u.email || '').toLowerCase().includes(lowerSearch));
        }
        if (role) {
            allUsers = allUsers.filter(u => (u.roles || []).some((r) => r.name === role));
        }
        if (departmentId) {
            allUsers = allUsers.filter(u => u.departmentId === departmentId);
        }
        if (isActive !== undefined) {
            allUsers = allUsers.filter(u => u.isActive === isActive);
        }
        // Sort by createdAt desc
        allUsers.sort((a, b) => {
            var _a, _b, _c, _d;
            const aDate = ((_b = (_a = a.createdAt) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) || a.createdAt || 0;
            const bDate = ((_d = (_c = b.createdAt) === null || _c === void 0 ? void 0 : _c.toDate) === null || _d === void 0 ? void 0 : _d.call(_c)) || b.createdAt || 0;
            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });
        const total = allUsers.length;
        const start = (page - 1) * limit;
        const users = allUsers.slice(start, start + limit);
        return {
            users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async updateUser(id, data) {
        const updateData = { updatedAt: new Date() };
        if (data.firstName !== undefined)
            updateData.firstName = data.firstName;
        if (data.lastName !== undefined)
            updateData.lastName = data.lastName;
        if (data.phone !== undefined)
            updateData.phone = data.phone;
        if (data.departmentId !== undefined)
            updateData.departmentId = data.departmentId;
        if (data.isActive !== undefined)
            updateData.isActive = data.isActive;
        await firebase_1.db.collection('users').doc(id).update(updateData);
        return this.getUserById(id);
    }
    async assignRole(userId, roleId) {
        // Check if already assigned
        const existingSnap = await firebase_1.db.collection('userRoles')
            .where('userId', '==', userId)
            .where('roleId', '==', roleId)
            .limit(1)
            .get();
        if (existingSnap.empty) {
            await firebase_1.db.collection('userRoles').add({ userId, roleId });
        }
        return this.getUserById(userId);
    }
    async removeRole(userId, roleId) {
        const snap = await firebase_1.db.collection('userRoles')
            .where('userId', '==', userId)
            .where('roleId', '==', roleId)
            .get();
        const batch = firebase_1.db.batch();
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return this.getUserById(userId);
    }
    async deactivateUser(id) {
        await firebase_1.db.collection('users').doc(id).update({ isActive: false, updatedAt: new Date() });
        return this.getUserById(id);
    }
    async activateUser(id) {
        await firebase_1.db.collection('users').doc(id).update({ isActive: true, updatedAt: new Date() });
        return this.getUserById(id);
    }
    // --- Analytics ---
    async getSystemAnalytics() {
        // User counts
        const usersSnap = await firebase_1.db.collection('users').get();
        const totalUsers = usersSnap.size;
        const activeUsers = usersSnap.docs.filter(d => d.data().isActive).length;
        // User counts by role
        const allRolesSnap = await firebase_1.db.collection('roles').get();
        const roleMap = {};
        allRolesSnap.docs.forEach(d => { roleMap[d.id] = d.data().name; });
        const userRolesSnap = await firebase_1.db.collection('userRoles').get();
        const roleCounts = {};
        userRolesSnap.docs.forEach(d => {
            const roleName = roleMap[d.data().roleId] || 'UNKNOWN';
            roleCounts[roleName] = (roleCounts[roleName] || 0) + 1;
        });
        // Student count
        const studentsSnap = await firebase_1.db.collection('students').get();
        const totalStudents = studentsSnap.size;
        // Fee stats
        const feesSnap = await firebase_1.db.collection('fees').get();
        let totalFees = 0, collectedFees = 0, pendingFees = 0, overdueFees = 0;
        feesSnap.docs.forEach(d => {
            const fee = d.data();
            const amount = Number(fee.amount || 0);
            totalFees += amount;
            switch (fee.status) {
                case 'PAID':
                    collectedFees += amount;
                    break;
                case 'PENDING':
                    pendingFees += amount;
                    break;
                case 'OVERDUE':
                    overdueFees += amount;
                    break;
            }
        });
        // Attendance stats (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const attSnap = await firebase_1.db.collection('attendance')
            .where('date', '>=', thirtyDaysAgo)
            .get();
        const attStats = {};
        attSnap.docs.forEach(d => {
            const status = d.data().status || 'UNKNOWN';
            attStats[status] = (attStats[status] || 0) + 1;
        });
        return {
            users: {
                total: totalUsers,
                active: activeUsers,
                byRole: roleCounts,
            },
            students: {
                total: totalStudents,
            },
            fees: {
                total: totalFees,
                collected: collectedFees,
                pending: pendingFees,
                overdue: overdueFees,
            },
            attendance: attStats,
        };
    }
    async getRoles() {
        const snap = await firebase_1.db.collection('roles').orderBy('name', 'asc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map