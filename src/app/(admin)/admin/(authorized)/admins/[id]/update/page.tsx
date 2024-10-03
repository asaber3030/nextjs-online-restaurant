import translate from "@/services/translate";

import { notFound } from "next/navigation";
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { UpdateAdminForm } from "@/app/(admin)/_components/admins/update-admin-form";
import { getAdminById } from "@/actions/admin";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

const UpdateAdminPage = async ({ params }: { params: { id: string } }) => {

  const adminId = +params.id
  const admin = await getAdminById(adminId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!admin) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateAdmin', language)} - ${admin?.name}`} />
      <UpdateAdminForm admin={admin} />
    </div>
  );
}
 
export default UpdateAdminPage;