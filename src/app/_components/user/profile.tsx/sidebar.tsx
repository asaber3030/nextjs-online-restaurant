"use client"

import Image from "next/image";
import Link from "next/link";

import { useContext } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { cairoFont } from "@/lib/fonts";
import { profileSidebarList, profileSecondSidebarList } from "@/lib/lists";

import { LanguageContext } from "@/providers/language";
import { ResturantContext } from "@/providers/restaurant";
import { Separator } from "@/components/ui/separator";

import translate from "@/services/translate";

export const ProfileSidebar = () => {

  const { current: currentRes } = useContext(ResturantContext)

  const language = useContext(LanguageContext)
  const pathname = usePathname()

  return ( 
    <aside className="xl:col-span-2 col-span-1">
      <header className={cn(
        "flex gap-4 items-center border rounded-md p-4 mb-2", 
        cairoFont.className,
      )}>
        <Image src={currentRes?.logo ?? '/logo.png'} alt="App Logo" width={40} height={40} />
        <div className='pl-4'>
          <h2 className="font-bold">{currentRes?.name}</h2>
          <h2 className="text-gray-500 text-xs">{currentRes?.location}</h2>
        </div>
      </header>
      <ul>
        {profileSidebarList.map(({ id, label, url, icon: Icon }) => (
          <li key={`ipsb-idx-${id}`}>
            <Link href={url} className={cn("flex gap-2 items-center px-4  py-2 border transition-all hover:bg-gray-50 rounded-md mb-1 text-sm text-gray-500", pathname.endsWith(url) && 'bg-secondaryMain text-blackMain border-secondaryMain hover:bg-secondaryMain')}>
              <Icon className={cn("size-4 text-gray-500", pathname.endsWith(url) && 'text-blackMain')} />
              {translate(label, language)}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}