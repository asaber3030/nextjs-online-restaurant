"use client"

import { useRouter } from "next/navigation"
import { useContext } from "react"
import { build } from "search-params"

import { SearchParams } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageContext } from "@/providers/language"

import translate from "@/services/translate"

type Props = { searchParams: SearchParams }

export const OrderTypeFilter = ({ searchParams }: Props) => {
  const router = useRouter()
  const language = useContext(LanguageContext)

  const handleChange = (value: string) => {
    const query = build({ ...searchParams, orderType: value })
    router.push("?" + query)
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder={translate("orderType", language)} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"asc"}>{translate("asecending", language)}</SelectItem>
        <SelectItem value={"desc"}>{translate("desecending", language)}</SelectItem>
      </SelectContent>
    </Select>
  )
}
