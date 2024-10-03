"use client";

import Link from "next/link";
import translate from "@/services/translate";

import { routes } from "@/lib/routes";
import { Fragment, useContext } from "react";
import { LanguageContext } from "@/providers/language";
import { LogIn, UserPlus } from "lucide-react";

export const NavbarGuestLinks = () => {

  const language = useContext(LanguageContext)

  return ( 
    <Fragment>
      <li><Link className="px-4 py-2 rounded-md border text-sm line-clamp-1 text-nowrap truncate bg-white hover:text-secondaryMain transition-all hover:border-secondaryMain flex gap-2 items-center" href={routes.login()}><LogIn className="size-4" /> {translate('login', language)}</Link></li>
      <li><Link className="px-4 py-2 rounded-md border text-sm line-clamp-1 text-nowrap truncate bg-white hover:text-secondaryMain transition-all hover:border-secondaryMain flex gap-2 items-center" href={routes.register()}><UserPlus className="size-4" /> {translate('register', language)}</Link></li>
    </Fragment>
  );
}