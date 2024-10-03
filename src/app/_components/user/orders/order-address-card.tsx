"use client";

import { formatDate } from "@/lib/utils";
import { FullOrder } from "@/types";
import { Send } from "lucide-react";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";

type Props = {
  order: FullOrder
}

export const OrderAdressCard = ({ order }: Props) => {
  
  const language = useContext(LanguageContext)

  return order?.address ? (
    <li className='p-4 rounded-md border flex gap-4 h-fit'>
      <Send className="text-main size-5" />
      <div>
        <h4 className='font-semibold'>{translate('deliveryAddress', language)}</h4>
        <p className="text-gray-500"><b>{order?.address?.streetName}</b> - <b>{order?.address?.homeNumber}</b></p>
        <p className="text-gray-500">{order.address.phoneNumber}</p>
      </div>
    </li>
  ): null
}