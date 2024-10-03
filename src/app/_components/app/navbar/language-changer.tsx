"use client"

import { useCookies } from 'next-client-cookies';
import { useContext } from "react";

import { Check, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvailableLanguages } from "@/types";
import { LanguageContext } from "@/providers/language";

import { cookieLangName } from "@/lib/constants";

import Image from "next/image";
import translate from "@/services/translate";
import { Button } from '@/components/ui/button';

export const LanguageChangerDropdown = () => {

  const cookies = useCookies()
  const currentLanguage = useContext(LanguageContext)

  const changeLanguage = (language: AvailableLanguages) => {
    cookies.set(cookieLangName, language)
    window.location.reload()
  }

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='default'>
          {translate('language', currentLanguage)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuItem onClick={() => changeLanguage('ar')} className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image src='/defaults/arabic-lang.png' width={25} height={25} alt='Lang' />
            {translate('arabic', currentLanguage)}
          </div>
          {currentLanguage === 'ar' && <Check className='size-4' />} 
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image src='/defaults/english-lang.svg' width={25} height={25} alt='Lang' />
            {translate('english', currentLanguage)}
          </div>
          {currentLanguage === 'en' && <Check className='size-4' />} 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}