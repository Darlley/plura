import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function AgencyDashboardPage() {
  const authUser = await currentUser();
  if (!authUser) return redirect('/sign-in');
  return <div>Agency Dashboard Page</div>;
}
