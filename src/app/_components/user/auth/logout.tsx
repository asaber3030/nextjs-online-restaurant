"use client";

import translate from "@/services/translate";

import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/providers/language";
import { ClassValue } from "class-variance-authority/types";
import { cookieUserName } from "@/lib/constants";
import { LogOut } from "lucide-react";

type Props = {
  className?: ClassValue
}

export const LogoutButton = ({ className }: Props) => {

  const cookies = useCookies()
  const router = useRouter()
  const language = useContext(LanguageContext)

  const handleLogout = () => {
    cookies.remove(cookieUserName)
    router.refresh()
    router.push(routes.home())
    window.location.reload()
  }

  return ( 
    <Button onClick={handleLogout} className={cn(className, 'text-red-500 w-full justify-start hover:bg-red-100 bg-transparent')}>
      <LogOut className="size-4" />
      {translate('logout', language)}
    </Button>
  );
}