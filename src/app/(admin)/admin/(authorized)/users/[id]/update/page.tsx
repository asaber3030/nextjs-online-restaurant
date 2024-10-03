import { notFound } from "next/navigation";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { UpdateUserForm } from "@/app/(admin)/_components/users/update-user-form";
import { getUserById, updateUser } from "@/actions/user";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {

  const userId = +params.id
  const user = await getUserById(userId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages
  
  if (!user) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateUser', language)} - ${user?.name}`} />
      <UpdateUserForm user={user} />
    </div>
  );
}
 
export default UpdateUserPage;