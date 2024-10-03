
"use client";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";


import { formatDate } from "@/lib/utils";
import { FullOrder } from "@/types";

type Props = {
  order: FullOrder
}

export const OrderSummaryCard = ({ order }: Props) => {
  const language = useContext(LanguageContext)


  return ( 
    <li className='p-4 rounded-md border h-fit list-none'>
    <h3 className="text-center mb-2 font-bold">{translate('summary', language)}</h3>
    <ul className='w-full space-y-2'>
      <li className="w-full text-sm flex justify-between items-center">
        <span className="font-medium">{translate('orderedAt', language)}</span>
        <span>{formatDate(order.orderedAt)}</span>
      </li>
      <li className="w-full text-sm flex justify-between items-center">
        <span className="font-medium">{translate('deliveryTaxes', language)}</span>
        <span className="text-green-800 font-bold">{order.deliveryValue} {translate('le', language)}</span>
      </li>
      <li className="w-full text-sm flex justify-between items-center">
        <span className="font-medium">{translate('discount', language)}</span>
        <span className="text-green-800 font-bold">{order.discountValue} {translate('le', language)}</span>
      </li>
      <li className="w-full text-sm flex justify-between items-center">
        <span className="font-medium">{translate('subTotal', language)}</span>
        <span className="text-green-800 font-bold">{order.subTotal} {translate('le', language)}</span>
      </li>
      <li className="w-full text-sm flex justify-between items-center">
        <span className="font-medium">{translate('total', language)}</span>
        <span className="text-green-800 font-bold">{order.total} {translate('le', language)}</span>
      </li>
    </ul>
  </li>
  );
}