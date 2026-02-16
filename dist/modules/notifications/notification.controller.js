"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
exports.getMyNotifications = getMyNotifications;
const notification_service_1 = require("./notification.service");
const service = new notification_service_1.NotificationService();
async function createNotification(req, res) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
}
async function getMyNotifications(req, res) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
}
//# sourceMappingURL=notification.controller.js.map