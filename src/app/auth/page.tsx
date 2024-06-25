'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/start', {
        username,
        request_id: 'your_request_id',
        request_secret: process.env.AUTH_SECRET!,
        request_ip: 'user_ip_address',
        request_callback: 'http://localhost:3000/callback',
      });

      const { id } = response.data;
      router.push(`https://api.minecraft.id/auth/authorize/${id}?request_id=your_request_id&username=${username}`);
    } catch (error) {
      console.error('Failed to start authentication:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Authenticate</button>
    </form>
  );
}