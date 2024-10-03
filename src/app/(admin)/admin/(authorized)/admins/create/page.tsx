import translate from "@/services/translate";

import { CreateAdminForm } from "@/app/(admin)/_components/admins/create-admin-form";
import { AdminTitle } from "@/app/(admin)/_components/common/title";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

const CreateCategoryPage = () => {
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={translate('createAdmin', language)} />
      <CreateAdminForm />
    </div>
  );
}
 
export default CreateCategoryPage;