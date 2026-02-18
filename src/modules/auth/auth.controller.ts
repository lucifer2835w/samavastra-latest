import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const service = new AuthService();

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, hasPassword: !!password });

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await service.validateUser(email, password);
    console.log('Validation result:', result ? 'Success' : 'Failed');

    if (!result) {
      console.log('Invalid credentials for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Login successful for:', email);
    return res.json(result);
  } catch (err) {
    console.error('Login error:', err);
    console.error('Error details:', JSON.stringify(err, null, 2));
    return res.status(500).json({ error: 'Login failed' });
  }
}

export async function getMe(req: any, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await service.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error in getMe:', error);
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}

