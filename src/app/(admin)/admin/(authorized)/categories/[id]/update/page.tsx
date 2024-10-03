import { getCategory } from "@/actions/categories";
import { UpdateCategoryForm } from "@/app/(admin)/_components/categories/update-category-form";
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateCategoryPage = async ({ params }: { params: { id: string } }) => {

  const categoryId = +params.id
  const category = await getCategory(categoryId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!category) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateCategory', language)} - ${category?.enName}`} />
      <UpdateCategoryForm category={category} />
    </div>
  );
}
 
export default UpdateCategoryPage;