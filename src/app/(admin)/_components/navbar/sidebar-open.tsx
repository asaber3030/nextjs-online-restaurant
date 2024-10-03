import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";
import { AvailableLanguages } from "@/types";
import { SidebarLinks } from "../sidebar/sidebar-links";
import { Separator } from "@/components/ui/separator";
import { ResturantSwitcher } from "@/app/_components/app/navbar/resturant-switcher";
import { SidebarHeader } from "../sidebar/sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SidebarNavbarOpen = () => {
  const store = cookies()
  const language = (store.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages
  return ( 
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-9"><Menu className='size-4 text-gray-500' /></Button>
      </SheetTrigger>
      <ScrollArea>
        <SheetContent className="pt-6">
          <SidebarHeader />
          <SidebarLinks />
          <Separator className="my-2" />
          <ResturantSwitcher className='w-full' />
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
}