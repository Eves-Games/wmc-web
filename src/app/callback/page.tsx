'use client';

import { useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const mcauthSuccess = searchParams.get('success') === 'true';
  const mcauthStatus = searchParams.get('status');

  return (
    <section className="mx-auto text-center space-y-2">
      <h1 className="text-xl font-black">Authentication result</h1>
      <div className='badge badge-lg'>{mcauthStatus}</div>
      {mcauthStatus == "VERIFIED" && <p>Welcome to WorldMC.</p>}
    </section>
  );
}