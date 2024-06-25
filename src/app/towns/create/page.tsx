import { CreateTown } from './CreateTown';
import { getAuthenticatedUser } from '@/auth';

export default async function Page() {
  const user = getAuthenticatedUser();

  if (!user) throw new Error("You are not signed in!");

  return <CreateTown userUUID={user.uuid} />;
}