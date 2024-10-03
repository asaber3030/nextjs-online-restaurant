"use client";

import { useRouter } from "next/navigation";
import { build } from 'search-params'

import { OrderBy, SearchParams } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";

type Props = { searchParams: SearchParams, orderByArray: OrderBy[] }

export const OrderFilter = ({ searchParams, orderByArray }: Props) => {

  const router = useRouter()
  const language = useContext(LanguageContext)

  const handleChange = (value: string) => {
    const query = build({ ...searchParams, orderBy: value })
    router.push("?" + query)
  }

  return ( 
    <Select onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder={translate('orderBy', language)} />
      </SelectTrigger>
      <SelectContent>
        {orderByArray.map((item, idx) => <SelectItem key={idx} value={item.name}>{item.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}