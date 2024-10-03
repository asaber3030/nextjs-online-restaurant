"use client";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";


import { FullOrder } from "@/types";
import { OrderTracker } from "./order-tracker";
import { OrderSummaryCard } from "./order-summary-card";
import { ProfileTitle } from "../profile.tsx/profile-title";
import { OrderAdressCard } from "./order-address-card";

type Props = {
  order: FullOrder | null
}

export const CurrentOrderBlock = ({ order }: Props) => {
  
  const language = useContext(LanguageContext)
  if (!order) return null

  return ( 
    <div className='my-4 mt-0'>
      <ProfileTitle title={translate('justOrdered', language) as string} />
      <OrderTracker parentClassName="border-none mb-10 mt-6 justify-center" status={order.status} statusNumber={order.statusNumber} />
      <div className="grid xl:grid-cols-3 gap-4">
        <OrderSummaryCard order={order} />
        <OrderAdressCard order={order} />
      </div>
    </div>
  );
}