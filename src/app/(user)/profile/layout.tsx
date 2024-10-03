import { getUser } from "@/actions/user";
import { ProfileSidebar } from "@/app/_components/user/profile.tsx/sidebar";
import { redirect } from "next/navigation";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {

  const user = await getUser()
  if (!user) return redirect('/login')

  return (
    <div className="py-4 gap-4 xl:px-20 px-6 grid xl:grid-cols-8 grid-cols-1">
      <ProfileSidebar />
      <div className="col-span-1 xl:col-span-6">
        {children}
      </div>
    </div>
  );
}
 
export default ProfileLayout;