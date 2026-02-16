import { Request, Response } from 'express';
import { NotificationService } from './notification.service';

const service = new NotificationService();

export async function createNotification(req: Request, res: Response) {
    try {
        const { title, message, type, recipientId, targetRole, classId } = req.body;
        // @ts-ignore
        const senderId = req.user.id;

        const notification = await service.createNotification({
            title,
            message,
            type,
            senderId,
            recipientId,
            targetRole,
            classId
        });
        res.json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
}

export async function getMyNotifications(req: Request, res: Response) {
    try {
        // @ts-ignore
        const userId = req.user.id;
        // @ts-ignore
        const userRoles = req.user.roles || [];
        // Determine primary role for notification targeting (simplified)
        const role = userRoles.includes('STUDENT') ? 'STUDENT' :
            userRoles.includes('TEACHER') ? 'TEACHER' :
                userRoles.includes('PARENT') ? 'PARENT' : 'USER';

        // TODO: Get classId if student
        const classId = undefined; // Need to fetch student profile to get classId

        const notifications = await service.getNotificationsForUser(userId, role, classId);
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
}
