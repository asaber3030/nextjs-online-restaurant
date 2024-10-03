import { getAdmin } from "@/actions/admin";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

type Props = {
 
}
export const SidebarHeader = async ({}: Props) => {
  
  const admin = await getAdmin()
  if (!admin) return redirect(routes.adminLogin())

  return ( 
    <div className="flex gap-4 items-center transition-all p-4 py-2 border bg-white rounded-md cursor-pointer shadow-sm ">
      <Avatar className="bg-secondaryMain">
        <AvatarFallback className="bg-secondaryMain">{admin?.name[0] + admin?.name[1]}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-sm">{admin.name}</h2>
        <p className="line-clamp-1 text-xs text-gray-500">{admin.email}</p>
      </div>
    </div>
  );
}