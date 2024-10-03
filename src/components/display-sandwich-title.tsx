"use client"

import { cairoFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { LanguageContext } from "@/providers/language";
import { ClassValue } from "class-variance-authority/types";
import { useContext } from "react";

type Props = {
  en: React.ReactNode, 
  ar: React.ReactNode, 
  className?: ClassValue, 
  enClass?: ClassValue, 
  arClass?: ClassValue
}

export const DisplaySandwichTitle = ({ en, ar, className, enClass, arClass }: Props) => {

  const language = useContext(LanguageContext)

  return ( 
    <div className={cn('text-xl line-clamp-1 max-w-full font-medium flex items-center justify-between', className)}>
      {language === 'en' ? (
        <span className={cn(enClass, 'line-clamp-1')}>{en}</span>
      ): (
        <span className={cn(arClass, cairoFont.className, 'line-clamp-1')}>{ar}</span>
      )}
    </div>
  );
}