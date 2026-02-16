import { db } from '../../config/firebase';

export class NotificationService {
    async createNotification(data: {
        title: string;
        message: string;
        type: string;
        senderId: string;
        recipientId?: string;
        targetRole?: string;
        classId?: string;
    }) {
        const docRef = await db.collection('notifications').add({
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

    async getNotificationsForUser(userId: string, role: string, classId?: string) {
        // Firestore doesn't support OR queries across different fields natively,
        // so we run multiple queries and merge results
        const results: any[] = [];
        const seenIds = new Set<string>();

        // Get direct notifications
        const directSnap = await db.collection('notifications')
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
        const allSnap = await db.collection('notifications')
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
        const roleSnap = await db.collection('notifications')
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
            const classSnap = await db.collection('notifications')
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
                const senderDoc = await db.collection('users').doc(notif.senderId).get();
                if (senderDoc.exists) {
                    const senderData = senderDoc.data()!;
                    notif.sender = { firstName: senderData.firstName, lastName: senderData.lastName };
                }
            }
        }

        // Sort by createdAt desc
        results.sort((a, b) => {
            const aTime = a.createdAt?.toDate?.() || a.createdAt;
            const bTime = b.createdAt?.toDate?.() || b.createdAt;
            return new Date(bTime).getTime() - new Date(aTime).getTime();
        });

        return results;
    }

    async markAsRead(id: string) {
        const docRef = db.collection('notifications').doc(id);
        await docRef.update({ isRead: true });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
}
