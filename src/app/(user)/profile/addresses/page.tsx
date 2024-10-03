import { getUser } from "@/actions/user";
import { AddressesList } from "@/app/_components/user/profile.tsx/address/addresses-list";
import { NewAddressModal } from "@/app/_components/user/profile.tsx/address/new-address";
import { ProfileTitle } from "@/app/_components/user/profile.tsx/profile-title";
import { cookieLangName } from "@/lib/constants";
import db from "@/services/prisma";
import translate from "@/services/translate";
import { AvailableLanguages } from "@/types";

import { cookies } from "next/headers";

const AddressesPage = async () => {
  const cookiesStore = cookies()
  const language = cookiesStore.get(cookieLangName)?.value as AvailableLanguages ?? 'ar'
  const user = await getUser()
  const addresses = await db.address.findMany({
    where: { userId: user?.id },
    orderBy: { id: 'desc' }
  })

  return (
    <div>
      <ProfileTitle title={translate('addresses', language) as string}>
        <NewAddressModal />
      </ProfileTitle>
      <AddressesList addresses={addresses} />
    </div>
  );
}
 
export default AddressesPage;