import Link from "next/link";
import translate from "@/services/translate";

import { getUser } from "@/actions/user";
import { getCurrentResturant } from "@/actions/app";
import { routes } from "@/lib/routes";
import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";

import { AvailableLanguages } from "@/types";

import { ChefHat, Home, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { LanguageChangerDropdown } from "./language-changer";
import { ShoppingCartDropdown } from "./shopping-cart";
import { ResturantSwitcher } from "./resturant-switcher";
import { UserDropdown } from "./user-dropdown";
import { NavbarGuestLinks } from "./navbar-guest-links";
import { ContactDropdown } from "./contact-dropdown";

export const MobileNavbarContainer = async () => {
  const user = await getUser();
  const cookiesStore = cookies();
  const language =
    (cookiesStore.get(cookieLangName)?.value as AvailableLanguages) ?? "ar";
  const resturant = await getCurrentResturant();

  return (
    <nav className="xl:hidden fixed h-[85px] w-full left-0 top-0 z-40 items-center justify-between xl:px-20 px-6 py-4 bg-gray-50 border-b border-b-gray-200">
      <div className="flex gap-1 justify-between items-center">
        <Logo showAppName={false} logo={resturant?.logo} />

        <div className="flex items-center gap-2">
          <LanguageChangerDropdown />
          <ShoppingCartDropdown />
          <ContactDropdown />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="py-4">
                <Logo showAppName={false} logo={resturant?.logo} />
              </SheetHeader>
              <ul className="mt-4 gap-1 grid">
                {user ? (
                  <>
                    <li>
                      <Link
                        className="flex gap-2 py-2 px-4 rounded-md text-nowrap items-center transition-all border bg-white line-clamp-1 hover:bg-gray-100 text-sm"
                        href={routes.home()}
                      >
                        <Home className="size-4 text-main" />{" "}
                        {translate("home", language)}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex gap-2 py-2 px-4 rounded-md text-nowrap items-center transition-all border bg-white line-clamp-1 hover:bg-gray-100 text-sm"
                        href={routes.menu()}
                      >
                        <ChefHat className="size-4 text-main" />{" "}
                        {translate("menu", language)}
                      </Link>
                    </li>
                    <ResturantSwitcher />
                    <UserDropdown
                      className="w-full flex min-w-full max-w-full justify-start items-center"
                      name={user.name}
                    />
                  </>
                ) : (
                  <>
                    <NavbarGuestLinks />
                    <ResturantSwitcher />
                  </>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
