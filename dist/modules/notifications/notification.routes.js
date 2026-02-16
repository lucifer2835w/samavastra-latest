"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
// Only Admin/Teachers can send notifications
router.post('/send', (0, roles_1.requireRoles)('ADMIN', 'TEACHER'), notification_controller_1.createNotification);
// All authenticated users can view their notifications
router.get('/my', notification_controller_1.getMyNotifications);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map