"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const firebase_1 = require("../../config/firebase");
class NotificationService {
    async createNotification(data) {
        const docRef = await firebase_1.db.collection('notifications').add({
            title: data.title,
            message: data.message,
            type: data.type,
            senderId: data.senderId,
            recipientId: data.recipientId || null,
            targetRole: data.targetRole || null,
            classId: data.classId || null,
            isRead: false,
            createdAt: new Date(),
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
    async getNotificationsForUser(userId, role, classId) {
        // Firestore doesn't support OR queries across different fields natively,
        // so we run multiple queries and merge results
        const results = [];
        const seenIds = new Set();
        // Get direct notifications
        const directSnap = await firebase_1.db.collection('notifications')
            .where('recipientId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        directSnap.docs.forEach(doc => {
            if (!seenIds.has(doc.id)) {
                seenIds.add(doc.id);
                results.push({ id: doc.id, ...doc.data() });
            }
        });
        // Get broadcast to ALL
        const allSnap = await firebase_1.db.collection('notifications')
            .where('targetRole', '==', 'ALL')
            .orderBy('createdAt', 'desc')
            .get();
        allSnap.docs.forEach(doc => {
            if (!seenIds.has(doc.id)) {
                seenIds.add(doc.id);
                results.push({ id: doc.id, ...doc.data() });
            }
        });
        // Get role-specific
        const roleSnap = await firebase_1.db.collection('notifications')
            .where('targetRole', '==', role)
            .orderBy('createdAt', 'desc')
            .get();
        roleSnap.docs.forEach(doc => {
            if (!seenIds.has(doc.id)) {
                seenIds.add(doc.id);
                results.push({ id: doc.id, ...doc.data() });
            }
        });
        // Get class-specific
        if (classId) {
            const classSnap = await firebase_1.db.collection('notifications')
                .where('classId', '==', classId)
                .orderBy('createdAt', 'desc')
                .get();
            classSnap.docs.forEach(doc => {
                if (!seenIds.has(doc.id)) {
                    seenIds.add(doc.id);
                    results.push({ id: doc.id, ...doc.data() });
                }
            });
        }
        // Fetch sender info for each notification
        for (const notif of results) {
            if (notif.senderId) {
                const senderDoc = await firebase_1.db.collection('users').doc(notif.senderId).get();
                if (senderDoc.exists) {
                    const senderData = senderDoc.data();
                    notif.sender = { firstName: senderData.firstName, lastName: senderData.lastName };
                }
            }
        }
        // Sort by createdAt desc
        results.sort((a, b) => {
            var _a, _b, _c, _d;
            const aTime = ((_b = (_a = a.createdAt) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) || a.createdAt;
            const bTime = ((_d = (_c = b.createdAt) === null || _c === void 0 ? void 0 : _c.toDate) === null || _d === void 0 ? void 0 : _d.call(_c)) || b.createdAt;
            return new Date(bTime).getTime() - new Date(aTime).getTime();
        });
        return results;
    }
    async markAsRead(id) {
        const docRef = firebase_1.db.collection('notifications').doc(id);
        await docRef.update({ isRead: true });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map