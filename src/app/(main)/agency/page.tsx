import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function AgencyDashboardPage() {
  // const authUser = await currentUser();
  // if (!authUser) return redirect('/sign-in');

  const agencyId = await verifyAndAcceptInvitation()
  console.log(agencyId)

  const user = await getAuthUserDetails();

  return <div>Agency Dashboard Page</div>;
}
