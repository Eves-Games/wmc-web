import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  username: string;
  uuid: string;
  exp: number;
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