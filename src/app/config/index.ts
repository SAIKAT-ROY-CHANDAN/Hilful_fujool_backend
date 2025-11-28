import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export default {
  databaseUrl: required("DATABASE_URL"),
  port: process.env.PORT,
  password: required("DEFAULT_PASS"),
  jwtSecret: required("JWT_SECRET"),
  jwtRefreshSecret: required("JWT_REFRESH_SECRET"),
  jwtAccessExpiresIn: required("JWT_ACCESS_TOKEN_EXPIRES"),
  jwtRefreshExpiresIn: required("JWT_REFRESH_TOKEN_EXPIRES"),
  serverUrl: required("SERVER_URL"),
  clientUrl: required("CLIENT_URL"),
  adminEmail: required("ADMIN_EMAIL"),
  adminPass: required("ADMIN_PASS"),
  adminFullName: required("ADMIN_FULLNAME"),
  password_salt_rounds: 10,
};