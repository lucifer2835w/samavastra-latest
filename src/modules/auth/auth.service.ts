import { prisma } from '../../config/db';
import { comparePassword } from '../../shared/utils/password';
import { signJwt } from '../../shared/utils/jwt';

export class AuthService {
  async validateUser(email: string, password: string) {
    console.log('validateUser called with email:', email);

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { roles: { include: { role: true } } },
      });

      console.log('User query result:', user ? 'Found user' : 'No user found');

      if (!user) return null;

      const passwordValid = await comparePassword(password, user.passwordHash);
      if (!passwordValid) return null;

      const roles = user.roles.map((r: any) => ({
        id: r.role.id,
        name: r.role.name,
        description: r.role.description,
      }));

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
