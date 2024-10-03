import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";
import { AvailableLanguages } from "@/types";
import { cn } from "@/lib/utils";

import translate from "@/services/translate";

export const LandingPageBanner = async () => {

  const cookiesStore = cookies()
  const language = cookiesStore.get(cookieLangName)?.value ?? 'ar'

  return ( 
    <header className="flex flex-col gap-4">
      <h1 className={cn("xl:text-3xl font-bold text-3xl text-center", language === 'en' ? "xl:text-left" : "xl:text-right")}>{translate('landingPageTitle', language as AvailableLanguages)}</h1>
      <p className={cn("text-sm text-gray-600 text-center", language === 'en' ? "xl:text-left" : "xl:text-right")}>{translate('landingPageDescription', language as AvailableLanguages)}</p>
      <Link href='/menu'><Button variant='secondaryMain' className='bg-yellowLight xl:w-fit w-full'>{translate('viewMenu', language as AvailableLanguages)}</Button></Link>
    </header>
  );
}