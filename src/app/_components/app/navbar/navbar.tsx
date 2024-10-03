import { cookieLangName } from "@/lib/constants";
import { getUser } from "@/actions/user";
import { getCurrentResturant } from "@/actions/app";
import { cookies } from "next/headers";

import { AvailableLanguages } from "@/types";
import { Logo } from "@/components/logo";
import { LanguageChangerDropdown } from "./language-changer";
import { ShoppingCartDropdown } from "./shopping-cart";
import { ResturantSwitcher } from "./resturant-switcher";
import { UserDropdown } from "./user-dropdown";
import { DefaultNavbarLinks } from "./default-navbar-links";
import { NavbarGuestLinks } from "./navbar-guest-links";
import { ContactDropdown } from "./contact-dropdown";

export const Navbar = async () => {

  const user = await getUser()
  const cookiesStore = cookies()
  const language = cookiesStore.get(cookieLangName)?.value as AvailableLanguages ?? 'ar'
  const resturant = await getCurrentResturant()

  return ( 
    <nav className="xl:flex fixed h-[85px] z-10 w-full left-0 top-0 hidden items-center justify-between xl:px-20 px-6 py-4 bg-gray-50 border-b border-b-gray-200">
      
      <div className="xl:flex gap-10 items-center">
        <Logo showAppName={false} logo={resturant?.logo} />
        <ResturantSwitcher />
        
        <ul className="flex items-center gap-1">
          <DefaultNavbarLinks />
        </ul>
      </div>
      
      <ul className="flex flex-wrap items-center gap-2">
        <li><ContactDropdown /></li>
        {user ? (
          <UserDropdown name={user.name} />
        ): (
          <NavbarGuestLinks />
        )}
        <li><LanguageChangerDropdown /></li>
        <li><ShoppingCartDropdown /></li>
      </ul>
    </nav>
  );
}