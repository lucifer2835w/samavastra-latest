import { prisma } from '../../config/db';
import { Notification } from '../../generated/prisma/client';

export class NotificationService {
    async createNotification(data: {
        title: string;
        message: string;
        type: string;
        senderId: number;
        recipientId?: number;
        targetRole?: string;
        classId?: number;
    }) {
        return prisma.notification.create({
            data: {
                title: data.title,
                message: data.message,
                type: data.type,
                senderId: data.senderId,
                recipientId: data.recipientId ?? null,
                targetRole: data.targetRole ?? null,
                classId: data.classId ?? null,
            }
        });
    }

    async getNotificationsForUser(userId: number, role: string, classId?: number) {
        return prisma.notification.findMany({
            where: {
                OR: [
                    { recipientId: userId },
                    { targetRole: 'ALL' },
                    { targetRole: role },
                    // If classId is provided (e.g., student's class), include notifications for that class
                    ...(classId ? [{ classId }] : [])
                ]
            },
            orderBy: { createdAt: 'desc' },
            include: { sender: { select: { firstName: true, lastName: true } } }
        });
    }

    async markAsRead(id: number) {
        return prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });
    }
}
