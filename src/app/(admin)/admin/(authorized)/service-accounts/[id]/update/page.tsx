import { notFound } from "next/navigation";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { UpdateServiceAccountForm } from "@/app/(admin)/_components/service-accounts/update-service-account-form";
import { getServiceAccountById } from "@/actions/service-accounts";
import { getResturants } from "@/actions/app";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateServiceAccountPage = async ({ params }: { params: { id: string } }) => {

  const serviceAccountId = +params.id
  const user = await getServiceAccountById(serviceAccountId)
  const restaurants = await getResturants()
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!user) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateServiceAccount', language)} - ${user?.name}`} />
      <UpdateServiceAccountForm restaurants={restaurants} account={user} />
    </div>
  );
}
 
export default UpdateServiceAccountPage;