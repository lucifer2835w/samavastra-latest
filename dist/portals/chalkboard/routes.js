"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
// Placeholder route for student/parent profile
router.get('/me/profile', auth_1.authenticateJWT, (0, roles_1.requireRoles)('STUDENT', 'PARENT'), (req, res) => {
    res.json({ message: 'Chalkboard profile endpoint (to be implemented)' });
});
exports.default = router;
//# sourceMappingURL=routes.js.map