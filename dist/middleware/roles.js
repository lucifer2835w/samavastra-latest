"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRoles = requireRoles;
function requireRoles(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const hasRole = user.roles.some((r) => roles.includes(r));
        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        return next();
    };
}
//# sourceMappingURL=roles.js.map