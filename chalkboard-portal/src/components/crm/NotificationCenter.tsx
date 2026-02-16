import React, { useState, useEffect } from 'react';
import { notificationsApi } from '../../api';
import type { Notification } from '../../types';
import './NotificationCenter.css';

export const NotificationCenter: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const data = await notificationsApi.getMy();
            setNotifications(data);
        } catch (err) {
            console.error('Failed to load notifications', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="notification-center">
            <button className="notification-bell" onClick={() => setIsOpen(!isOpen)}>
                🔔
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        <button onClick={fetchNotifications}>🔄</button>
                    </div>
                    <div className="notification-list">
                        {loading ? <p>Loading...</p> : (
                            notifications.length === 0 ? <p>No notifications</p> : (
                                notifications.map(notif => (
                                    <div key={notif.id} className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}>
                                        <div className="notif-title">{notif.title}</div>
                                        <div className="notif-message">{notif.message}</div>
                                        <div className="notif-meta">
                                            <span>{new Date(notif.createdAt).toLocaleDateString()}</span>
                                            <span className={`tag ${notif.type.toLowerCase()}`}>{notif.type}</span>
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
