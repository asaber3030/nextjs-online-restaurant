import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { adminRoutes, routes } from "@/lib/routes";
import { ChefHat, Cog, DollarSign, Download, Home, List, Lock, LogOut, Percent, Pizza, Truck, User, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";
import { AvailableLanguages } from "@/types";
import translate from "@/services/translate";

export const SidebarLinks = () => {

  const language = (cookies().get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return ( 
    <ul className="mt-4">
      <div>
        <SidebarItem icon={Home} url={routes.adminDashboard()} label={translate("dashboard", language)} />
        <SidebarItem icon={List} url={adminRoutes.categories()} label={translate("categories", language)} />
        <SidebarItem icon={Download} url={adminRoutes.coupons()} label={translate("coupons", language)} />
        <SidebarItem icon={Percent} url={adminRoutes.offers()} label={translate("offers", language)} />
        <SidebarItem icon={ChefHat} url={adminRoutes.menuItems()} label={translate("menu", language)} />
        <SidebarItem icon={Lock} url={adminRoutes.admins()} label={translate("admins", language)} />
        <SidebarItem icon={Users} url={adminRoutes.users()} label={translate("users", language)} />
        <SidebarItem icon={Truck} url={adminRoutes.serviceAccounts()} label={translate("serviceAccounts", language)} />
        <SidebarItem icon={Pizza} url={adminRoutes.restaurants()} label={translate("restaurants", language)} />
        <SidebarItem icon={DollarSign} url={adminRoutes.orders()} label={translate("orders", language)} />
      </div>

      <Separator className="my-4" />
      
      <div>
        <li><Link className="px-4 py-2 rounded-md mb-1 flex gap-4 items-center border border-transparent hover:border-border transition-all hover:bg-blue-50 font-medium text-sm" href='/'><Cog className='size-4 text-gray-500' /> {translate("settings", language)}</Link></li>
        <li><Link className="px-4 py-2 rounded-md mb-1 flex gap-4 items-center border border-transparent hover:border-border transition-all hover:bg-blue-50 font-medium text-sm" href='/'><User className='size-4 text-gray-500' /> {translate("myAccount", language)}</Link></li>
        <li><Link className="px-4 py-2 rounded-md mb-1 flex gap-4 items-center border border-transparent transition-all hover:bg-red-100 text-red-600 font-medium" href='/'><LogOut className='size-4 text-red-700' /> {translate("logout", language)}</Link></li>
      </div>
    </ul>
  );
}