"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
const password_1 = require("../../shared/utils/password");
const jwt_1 = require("../../shared/utils/jwt");
class AuthService {
    async validateUser(email, password) {
        const user = await db_1.prisma.user.findUnique({
            where: { email },
            include: { roles: { include: { role: true } } },
        });
        if (!user)
            return null;
        const passwordValid = await (0, password_1.comparePassword)(password, user.passwordHash);
        if (!passwordValid)
            return null;
        const roles = user.roles.map((r) => r.role.name);
        const token = (0, jwt_1.signJwt)({ id: user.id, roles });
        return { token, user: { id: user.id, email: user.email, roles } };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map