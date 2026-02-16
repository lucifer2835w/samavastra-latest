export declare class NotificationService {
    createNotification(data: {
        title: string;
        message: string;
        type: string;
        senderId: string;
        recipientId?: string;
        targetRole?: string;
        classId?: string;
    }): Promise<{
        id: string;
    }>;
    getNotificationsForUser(userId: string, role: string, classId?: string): Promise<any[]>;
    markAsRead(id: string): Promise<{
        id: string;
    }>;
}
//# sourceMappingURL=notification.service.d.ts.map