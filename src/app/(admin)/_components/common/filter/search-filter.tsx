"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { build } from 'search-params'

import { CustomInput } from "@/components/input";
import { SearchParams } from "@/types";
import { Search } from "lucide-react";
import { LanguageContext } from "@/providers/language";

import translate from "@/services/translate";

type Props = { searchParams: SearchParams }

export const SearchFilter = ({ searchParams }: Props) => {

  const router = useRouter()
  const language = useContext(LanguageContext)

  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')
  const query = build({ ...searchParams, search: searchValue })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push("?" + query)
  }

  return ( 
    <form onSubmit={handleSubmit}>
      <CustomInput icon={Search} placeholder={translate('search', language)} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
    </form>
  );
}