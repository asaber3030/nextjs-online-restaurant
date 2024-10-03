import { notFound } from "next/navigation";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { UpdateMenuItemForm } from "@/app/(admin)/_components/menu/update-menu-form";
import { getMenuItem } from "@/actions/menu";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateMenuPage = async ({ params }: { params: { id: string } }) => {

  const categoryId = +params.id
  const item = await getMenuItem(categoryId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!item) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateMenuItem', language)} - ${item?.enName}`} />
      <UpdateMenuItemForm item={item} />
    </div>
  );
}
 
export default UpdateMenuPage;