'use client'

import { getAuthUserDetails } from '@/lib/queries';
import MenuOptions from './MenuOptions';

type Props = {
  id: string;
  type: 'agency' | 'subaccount';
};
export default async function index({ id, type }: Props) {
  const user = await getAuthUserDetails();
  if (!user?.Agency) return null;

  const details =
    type === 'agency'
      ? user?.Agency
      : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabelAgency = user.Agency.whiteLabel;
  if (!details) return;

  let sidebarLogo = user?.Agency?.agencyLogo || '/assets/plura-logo.svg';

  if (!isWhiteLabelAgency) {
    if (type === 'subaccount') {
      sidebarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOpt =
    type === 'agency'
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
}
