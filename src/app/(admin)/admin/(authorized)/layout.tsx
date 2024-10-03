import './style.css'

import { AdminSidebar } from "../../_components/sidebar/sidebar";
import { AvailableLanguages } from "@/types";
import { AdminNavbar } from "../../_components/navbar/navbar";

import { getAdmin } from "@/actions/admin";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode
}
const AdminLayout = async ({ children }: Props) => {
  
  const admin = await getAdmin()
  const store = cookies()
  const language = (store.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!admin) return redirect(routes.adminLogin())

  return ( 
    <div className={cn("flex", language === 'en' ? 'flex-row-reverse xl:pl-[350px]' : 'flex-row xl:pr-[350px]')}>

      <AdminSidebar language={language} />

      <div className="w-full">
        <AdminNavbar />
        <div className="py-4 xl:px-10 px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout