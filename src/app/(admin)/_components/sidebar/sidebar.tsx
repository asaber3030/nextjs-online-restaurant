import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "./sidebar-header";
import { SidebarLinks } from "./sidebar-links";
import { ResturantSwitcher } from "@/app/_components/app/navbar/resturant-switcher";
import { AvailableLanguages } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  language: AvailableLanguages | undefined
}

export const AdminSidebar = ({ language }: Props) => {
  return ( 
    <aside className={cn("xl:w-[350px] hidden xl:block w-0 bg-white py-6 px-4 fixed h-full top-0", language === 'en' ? 'border-r left-0' : 'border-l right-0')}>
      <SidebarHeader />
      <SidebarLinks />
      <Separator className="my-2" />
      <ResturantSwitcher className='w-full' />
    </aside>
  );
}