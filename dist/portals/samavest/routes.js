"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJWT);
router.get('/dashboard', (0, roles_1.requireRoles)('ADMIN'), (req, res) => {
    res.json({ message: 'Samavest ERP admin dashboard (to be implemented)' });
});
exports.default = router;
//# sourceMappingURL=routes.js.map