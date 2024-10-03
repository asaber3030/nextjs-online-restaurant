"use client";

import translate from "@/services/translate";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";

import { FullOrder } from "@/types";
import { Percent } from "lucide-react";

type Props = {
  order: FullOrder
}

export const OrderCouponCard = ({ order }: Props) => {
  const language = useContext(LanguageContext)

  return order?.coupon ? (
    <li className='p-4 rounded-md border flex gap-4 h-fit'>
      <div>
        <Percent className="text-main size-5" />
      </div>
      <div>
        <h4 className='font-semibold'>{translate('usedCoupon', language)}</h4>
        <p className="text-gray-500"><b>{order?.coupon?.name}</b> - {translate('discount', language)}: {order?.coupon.discount}%</p>
      </div>
    </li>
  ): null
}