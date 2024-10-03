import { ProfileTitle } from "@/app/_components/user/profile.tsx/profile-title";
import { UpdateUserInformation } from "@/app/_components/user/profile.tsx/update-information";
import { UpdateUserPassword } from "@/app/_components/user/profile.tsx/update-password";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cookieLangName } from "@/lib/constants";
import { AvailableLanguages } from "@/types";
import { Lock, User, Users } from "lucide-react";
import { cookies } from "next/headers";

import translate from "@/services/translate";

const ProfilePage = async () => {

  const cookiesStore = cookies()
  const language = cookiesStore.get(cookieLangName)?.value as AvailableLanguages ?? 'ar'

  return (
    <div>
      <ProfileTitle title={translate('profile', language)} />
      <Tabs defaultValue="account">
        <TabsList className="w-full">
          <TabsTrigger className="w-full flex gap-2" value="account"><User className="size-4 text-gray-500" /> {translate('account', language)}</TabsTrigger>
          <TabsTrigger className="w-full flex gap-2" value="password"><Lock className="size-4 text-gray-500" /> {translate('password', language)}</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UpdateUserInformation />
        </TabsContent>
        <TabsContent value="password">
          <UpdateUserPassword />
        </TabsContent>
      </Tabs>
    </div>
  );
}
 
export default ProfilePage;