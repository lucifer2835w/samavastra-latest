import { db } from '../../config/firebase';
import { comparePassword } from '../../shared/utils/password';
import { signJwt } from '../../shared/utils/jwt';
import { MOCK_USERS, MOCK_USERS_BY_ID } from './mockUsers';

export class AuthService {
  async validateUser(email: string, password: string) {
    console.log('validateUser called with email:', email);

    // --- DEV LOGIN BYPASS ---
    if (MOCK_USERS[email]) {
      console.log('⚠️ DEV LOGIN: Bypassing auth for', email);
      const user = MOCK_USERS[email];
      const token = signJwt({ id: user.id, roles: user.roles });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles.map((r: string) => ({ id: r.toLowerCase(), name: r })), // Mock role objects
        },
      };
    }
    // ------------------------

    try {
      // Find user by email
      const usersSnap = await db.collection('users').where('email', '==', email).limit(1).get();

      if (usersSnap.empty) {
        console.log('No user found');
        return null;
      }

      const userDoc = usersSnap.docs[0];
      const user = { id: userDoc.id, ...userDoc.data() } as any;

      console.log('User query result:', 'Found user');

      const passwordValid = await comparePassword(password, user.passwordHash);
      if (!passwordValid) return null;

      // Get roles for the user
      const rolesSnap = await db.collection('userRoles').where('userId', '==', user.id).get();
      const roles: any[] = [];

      for (const roleDoc of rolesSnap.docs) {
        const roleData = roleDoc.data();
        const roleRef = await db.collection('roles').doc(roleData.roleId).get();
        if (roleRef.exists) {
          const role = { id: roleRef.id, ...roleRef.data() };
          roles.push(role);
        }
      }

      const token = signJwt({ id: user.id, roles: roles.map(r => r.name) });

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
    } catch (error) {
      console.error('Error in validateUser:', error);
      throw error;
    }
  }

  async getUserById(userId: string) {
    // --- DEV LOGIN BYPASS ---
    if (MOCK_USERS_BY_ID[userId]) {
      const user = MOCK_USERS_BY_ID[userId];
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles.map((r: string) => ({ id: r.toLowerCase(), name: r })),
      };
    }
    // ------------------------

    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (!userDoc.exists) return null;

      const user = { id: userDoc.id, ...userDoc.data() } as any;

      // Get roles
      const rolesSnap = await db.collection('userRoles').where('userId', '==', userId).get();
      const roles: any[] = [];

      for (const roleDoc of rolesSnap.docs) {
        const roleData = roleDoc.data();
        const roleRef = await db.collection('roles').doc(roleData.roleId).get();
        if (roleRef.exists) {
          const role = { id: roleRef.id, ...roleRef.data() };
          roles.push(role);
        }
      }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
      };

    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  }
}
