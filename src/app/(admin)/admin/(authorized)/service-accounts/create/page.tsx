import { getResturants } from "@/actions/app";
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { CreateServiceAccountForm } from "@/app/(admin)/_components/service-accounts/create-service-account-form";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";
const CreateServiceAccountPage = async () => {
  
  const restaurants = await getResturants()
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={translate('createServiceAccount', language)} />
      <CreateServiceAccountForm restaurants={restaurants} />
    </div>
  );
}
 
export default CreateServiceAccountPage;