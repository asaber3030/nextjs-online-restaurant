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

export const PaginateNext = ({ disabled, className }: Props) => {

  const params = useSearchParams()
  const pageParam = params.get('page')
  const pageNumber = Number(pageParam)
  const isNotNaN = !isNaN(pageNumber)
  const page = isNotNaN ? pageNumber : 1
  const language = useContext(LanguageContext)

  return ( 
    <Button variant='outline' className={cn(className)} disabled={disabled} asChild>
      <Link href={`?page=${page + 1}`} className="flex gap-2 w-fit">
        {translate('next', language)}
        {language == 'en' ? <ArrowRight className="size-4 text-secondaryMain" /> : <ArrowLeft className="size-4 text-secondaryMain" />}
      </Link>
    </Button>
  );
}