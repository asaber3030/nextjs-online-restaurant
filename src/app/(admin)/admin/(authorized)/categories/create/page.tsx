import { CreateCategoryForm } from "@/app/(admin)/_components/categories/create-category-form";
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";
import translate from "@/services/translate";

const CreateCategoryPage = () => {
  
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={translate('createCategory', language)} />
      <CreateCategoryForm />
    </div>
  );
}
 
export default CreateCategoryPage;