import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  jwtSecret: process.env.JWT_SECRET || 'changeme-in-prod',
  bcryptRounds: process.env.BCRYPT_ROUNDS ? Number(process.env.BCRYPT_ROUNDS) : 10,
};

