import { db } from '../../config/firebase';
import { comparePassword } from '../../shared/utils/password';
import { signJwt } from '../../shared/utils/jwt';

export class AuthService {
  async validateUser(email: string, password: string) {
    console.log('validateUser called with email:', email);

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
}
