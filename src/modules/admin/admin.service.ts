import { db } from '../../config/firebase';
import bcrypt from 'bcrypt';
import { env } from '../../config/env';

// Helpers
async function fetchUser(userId: string) {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}
async function fetchRoles(userId: string) {
    const snap = await db.collection('userRoles').where('userId', '==', userId).get();
    const roles: any[] = [];
    for (const doc of snap.docs) {
        const roleDoc = await db.collection('roles').doc(doc.data().roleId).get();
        if (roleDoc.exists) {
            roles.push({ id: roleDoc.id, ...roleDoc.data() });
        }
    }
    return roles;
}

export class AdminService {
    // --- User Management ---
    async createUser(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
        departmentId?: string;
        roleNames?: string[];
    }) {
        const passwordHash = await bcrypt.hash(data.password, env.bcryptRounds);

        const userRef = db.collection('users').doc();
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
                const roleSnap = await db.collection('roles').where('name', '==', roleName).limit(1).get();
                if (!roleSnap.empty) {
                    await db.collection('userRoles').add({
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

    async getUserById(id: string) {
        const userDoc = await db.collection('users').doc(id).get();
        if (!userDoc.exists) return null;

        const user = { id: userDoc.id, ...userDoc.data() } as any;
        user.roles = await fetchRoles(id);

        // Fetch profiles
        const studentSnap = await db.collection('students').where('userId', '==', id).limit(1).get();
        user.student = studentSnap.empty ? null : { id: studentSnap.docs[0].id, ...studentSnap.docs[0].data() };

        const teacherSnap = await db.collection('teachers').where('userId', '==', id).limit(1).get();
        user.teacher = teacherSnap.empty ? null : { id: teacherSnap.docs[0].id, ...teacherSnap.docs[0].data() };

        const parentSnap = await db.collection('parents').where('userId', '==', id).limit(1).get();
        user.parent = parentSnap.empty ? null : { id: parentSnap.docs[0].id, ...parentSnap.docs[0].data() };

        if (user.departmentId) {
            const deptDoc = await db.collection('departments').doc(user.departmentId).get();
            user.department = deptDoc.exists ? { id: deptDoc.id, ...deptDoc.data() } : null;
        }

        return user;
    }

    async getAllUsers(
        page: number = 1,
        limit: number = 20,
        search?: string,
        role?: string,
        departmentId?: string,
        isActive?: boolean
    ) {
        const snap = await db.collection('users').get();
        let allUsers: any[] = [];

        for (const doc of snap.docs) {
            const user = { id: doc.id, ...doc.data() } as any;
            user.roles = await fetchRoles(doc.id);

            // Fetch profiles
            const studentSnap = await db.collection('students').where('userId', '==', doc.id).limit(1).get();
            user.student = studentSnap.empty ? null : { id: studentSnap.docs[0].id, ...studentSnap.docs[0].data() };

            const teacherSnap = await db.collection('teachers').where('userId', '==', doc.id).limit(1).get();
            user.teacher = teacherSnap.empty ? null : { id: teacherSnap.docs[0].id, ...teacherSnap.docs[0].data() };

            const parentSnap = await db.collection('parents').where('userId', '==', doc.id).limit(1).get();
            user.parent = parentSnap.empty ? null : { id: parentSnap.docs[0].id, ...parentSnap.docs[0].data() };

            allUsers.push(user);
        }

        // Apply filters
        if (search) {
            const lowerSearch = search.toLowerCase();
            allUsers = allUsers.filter(u =>
                (u.firstName || '').toLowerCase().includes(lowerSearch) ||
                (u.lastName || '').toLowerCase().includes(lowerSearch) ||
                (u.email || '').toLowerCase().includes(lowerSearch)
            );
        }

        if (role) {
            allUsers = allUsers.filter(u =>
                (u.roles || []).some((r: any) => r.name === role)
            );
        }

        if (departmentId) {
            allUsers = allUsers.filter(u => u.departmentId === departmentId);
        }

        if (isActive !== undefined) {
            allUsers = allUsers.filter(u => u.isActive === isActive);
        }

        // Sort by createdAt desc
        allUsers.sort((a, b) => {
            const aDate = a.createdAt?.toDate?.() || a.createdAt || 0;
            const bDate = b.createdAt?.toDate?.() || b.createdAt || 0;
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

    async updateUser(
        id: string,
        data: {
            firstName?: string;
            lastName?: string;
            phone?: string;
            departmentId?: string;
            isActive?: boolean;
        }
    ) {
        const updateData: any = { updatedAt: new Date() };
        if (data.firstName !== undefined) updateData.firstName = data.firstName;
        if (data.lastName !== undefined) updateData.lastName = data.lastName;
        if (data.phone !== undefined) updateData.phone = data.phone;
        if (data.departmentId !== undefined) updateData.departmentId = data.departmentId;
        if (data.isActive !== undefined) updateData.isActive = data.isActive;

        await db.collection('users').doc(id).update(updateData);
        return this.getUserById(id);
    }

    async assignRole(userId: string, roleId: string) {
        // Check if already assigned
        const existingSnap = await db.collection('userRoles')
            .where('userId', '==', userId)
            .where('roleId', '==', roleId)
            .limit(1)
            .get();

        if (existingSnap.empty) {
            await db.collection('userRoles').add({ userId, roleId });
        }
        return this.getUserById(userId);
    }

    async removeRole(userId: string, roleId: string) {
        const snap = await db.collection('userRoles')
            .where('userId', '==', userId)
            .where('roleId', '==', roleId)
            .get();

        const batch = db.batch();
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        return this.getUserById(userId);
    }

    async deactivateUser(id: string) {
        await db.collection('users').doc(id).update({ isActive: false, updatedAt: new Date() });
        return this.getUserById(id);
    }

    async activateUser(id: string) {
        await db.collection('users').doc(id).update({ isActive: true, updatedAt: new Date() });
        return this.getUserById(id);
    }

    // --- Analytics ---
    async getSystemAnalytics() {
        // User counts
        const usersSnap = await db.collection('users').get();
        const totalUsers = usersSnap.size;
        const activeUsers = usersSnap.docs.filter(d => d.data().isActive).length;

        // User counts by role
        const allRolesSnap = await db.collection('roles').get();
        const roleMap: Record<string, string> = {};
        allRolesSnap.docs.forEach(d => { roleMap[d.id] = d.data().name; });

        const userRolesSnap = await db.collection('userRoles').get();
        const roleCounts: Record<string, number> = {};
        userRolesSnap.docs.forEach(d => {
            const roleName = roleMap[d.data().roleId] || 'UNKNOWN';
            roleCounts[roleName] = (roleCounts[roleName] || 0) + 1;
        });

        // Student count
        const studentsSnap = await db.collection('students').get();
        const totalStudents = studentsSnap.size;

        // Fee stats
        const feesSnap = await db.collection('fees').get();
        let totalFees = 0, collectedFees = 0, pendingFees = 0, overdueFees = 0;
        feesSnap.docs.forEach(d => {
            const fee = d.data();
            const amount = Number(fee.amount || 0);
            totalFees += amount;
            switch (fee.status) {
                case 'PAID': collectedFees += amount; break;
                case 'PENDING': pendingFees += amount; break;
                case 'OVERDUE': overdueFees += amount; break;
            }
        });

        // Attendance stats (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const attSnap = await db.collection('attendance')
            .where('date', '>=', thirtyDaysAgo)
            .get();

        const attStats: Record<string, number> = {};
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
        const snap = await db.collection('roles').orderBy('name', 'asc').get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
