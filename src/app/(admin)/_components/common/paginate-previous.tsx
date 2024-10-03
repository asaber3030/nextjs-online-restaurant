"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ClassValue } from "class-variance-authority/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LanguageContext } from "@/providers/language";

import translate from "@/services/translate";

type Props = {
  className?: ClassValue
  disabled?: boolean
}

export const PaginatePrevious = ({ className, disabled }: Props) => {

  const language = useContext(LanguageContext)
  const params = useSearchParams()

  const pageParam = Number(params.get('page'))
  const isNotNaN = !isNaN(pageParam)
  const page = isNotNaN ? pageParam : 1

  return ( 
    <Button variant='outline' className={cn(className)} disabled={disabled || !page || page == 1} asChild>
      <Link href={`?page=${page - 1 === 0 ? 1 : page - 1}`} aria-disabled={disabled} className="flex gap-2 w-fit">
        {language == 'en' ? <ArrowLeft className="size-4 text-secondaryMain" /> : <ArrowRight className="size-4 text-secondaryMain" />}
        {translate('previous', language)}
      </Link>
    </Button>
  );
}