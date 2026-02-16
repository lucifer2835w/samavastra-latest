"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const firebase_1 = require("../../config/firebase");
const password_1 = require("../../shared/utils/password");
const jwt_1 = require("../../shared/utils/jwt");
class AuthService {
    async validateUser(email, password) {
        console.log('validateUser called with email:', email);
        try {
            // Find user by email
            const usersSnap = await firebase_1.db.collection('users').where('email', '==', email).limit(1).get();
            if (usersSnap.empty) {
                console.log('No user found');
                return null;
            }
            const userDoc = usersSnap.docs[0];
            const user = { id: userDoc.id, ...userDoc.data() };
            console.log('User query result:', 'Found user');
            const passwordValid = await (0, password_1.comparePassword)(password, user.passwordHash);
            if (!passwordValid)
                return null;
            // Get roles for the user
            const rolesSnap = await firebase_1.db.collection('userRoles').where('userId', '==', user.id).get();
            const roles = [];
            for (const roleDoc of rolesSnap.docs) {
                const roleData = roleDoc.data();
                const roleRef = await firebase_1.db.collection('roles').doc(roleData.roleId).get();
                if (roleRef.exists) {
                    const role = { id: roleRef.id, ...roleRef.data() };
                    roles.push(role);
                }
            }
            const token = (0, jwt_1.signJwt)({ id: user.id, roles: roles.map(r => r.name) });
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roles,
                },
            };
        }
        catch (error) {
            console.error('Error in validateUser:', error);
            throw error;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map