"use client"

import translate from "@/services/translate";
import Image from "next/image";

import { useContext } from "react";
import { useCookies } from 'next-client-cookies';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, ChevronsUpDown } from "lucide-react";
import { ResturantContext } from "@/providers/restaurant";
import { LanguageContext } from "@/providers/language";

import { cookieResturantName, logosLocation } from "@/lib/constants";
import { cairoFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ClassValue } from "class-variance-authority/types";

export const ResturantSwitcher = ({ className }: { className?: ClassValue }) => {

  const cookies = useCookies()
  const lang = useContext(LanguageContext)

  const { current: currentResturant, resturants } = useContext(ResturantContext)
  
  const switchResturants = (resturantId: number) => {
    cookies.set(cookieResturantName, String(resturantId))
    window.location.reload()
  }

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={cn("flex rounded-md bg-white border items-center gap-2 p-2 px-4 hover:bg-gray-100 transition-all text-sm font-medium text-main", className)}>
          <span>{translate("switchTo", lang)} <b className={cn(cairoFont.className, 'text-blackMain')}>{currentResturant?.id == 1 ? resturants[1]?.name : resturants[0]?.name}</b></span>
          <span className="text-blackMain"><ChevronsUpDown className="size-4" /></span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        {resturants.map((item) => (
          <DropdownMenuItem className={cn('flex justify-between', cairoFont.className)} onClick={() => switchResturants(item.id)} key={item.id}>
            <div className="flex gap-2">
              <Image src={item?.logo ?? logosLocation.first} alt='Logo' width={25} height={25} />
              {item.name}
            </div>
            {item.id === currentResturant?.id && <Check className="size-4 text-secondaryMain" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}