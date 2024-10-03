"use client";

import translate from "@/services/translate";
import Link from "next/link";

import { routes } from "@/lib/routes";
import { LanguageContext } from "@/providers/language";
import { ChefHat, Home } from "lucide-react";
import { Fragment, useContext } from "react";

export const DefaultNavbarLinks = () => {
  
  const language = useContext(LanguageContext)

  return ( 
    <Fragment>
      <li><Link className="flex gap-2 py-2 px-4 rounded-md text-nowrap items-center transition-all border bg-white line-clamp-1 hover:bg-gray-100 xl:text-sm text-xs" href={routes.home()}><Home className="size-4 text-main" /> {translate("home", language)}</Link></li>
      <li><Link className="flex gap-2 py-2 px-4 rounded-md text-nowrap items-center transition-all border bg-white line-clamp-1 hover:bg-gray-100 xl:text-sm text-xs" href={routes.menu()}><ChefHat className="size-4 text-main" /> {translate("menu", language)}</Link></li>
    </Fragment>
  );
}