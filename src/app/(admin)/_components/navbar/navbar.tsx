import Link from "next/link";

import { getAdmin } from "@/actions/admin";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";
import { AvailableLanguages } from "@/types";
import { Logo } from "@/components/logo";
import { LanguageChangerDropdown } from "@/app/_components/app/navbar/language-changer";
import { getCurrentResturant } from "@/actions/app";

import translate from "@/services/translate";
import { SidebarNavbarOpen } from "./sidebar-open";

export const AdminNavbar = async () => {
  
  const admin = await getAdmin()
  const store = cookies()
  const language = (store.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages
  const res = await getCurrentResturant()

  if (!admin) return redirect(routes.adminLogin())

  return ( 
    <nav className="bg-white border-b flex justify-between items-center xl:px-10 px-2 py-3 gap-4 xl:gap-0">
      <Logo logo={res?.logo ?? '/main-logo.svg'} showAppName={false} />
      <ul className="flex gap-2 items-center">
        <li><Link className="px-4 py-1 rounded-md border transition-all w-full hover:border-secondaryMain" href={routes.adminDashboard()}>{translate('dashboard', language)}</Link></li>
        <li><LanguageChangerDropdown /></li>
        <li className="xl:hidden block"><SidebarNavbarOpen /></li>
      </ul>
    </nav>
  );
}