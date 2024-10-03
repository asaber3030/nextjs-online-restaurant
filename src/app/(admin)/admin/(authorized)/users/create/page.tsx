import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { CreateUserForm } from "@/app/(admin)/_components/users/create-user-form";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const CreateCategoryPage = () => {
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={translate('createUser', language)} />
      <CreateUserForm />
    </div>
  );
}
 
export default CreateCategoryPage;