import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  username: string;
  uuid: string;
  exp: number;
}

export const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000' // default to localhost for local development
}

export function getAuthenticatedUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      return decoded;
    } catch (error) {
      console.error('Failed to verify token:', error);
      return null;
    }
  }

  return null;
}