"use client";

import translate from "@/services/translate";

import { useContext } from "react";

import { LanguageContext } from "@/providers/language";
import { FullOrder } from "@/types";
import { ProfileTitle } from "@/app/_components/user/profile.tsx/profile-title";
import { Badge } from "@/components/ui/badge";

import { CancelOrderButton } from "./cancel-order-button";

type Props = { order: FullOrder }

export const OrderTitle = ({ order }: Props) => {

  const language = useContext(LanguageContext)

  return ( 
    <ProfileTitle title={`${translate('order', language)} #${order.id}`}>
      <div className="flex gap-2">
        <p className="text-green-900 border p-2 rounded-md text-xs">{translate('estimatedTime', language)} <b>{order.estimatedTime} mins</b></p>
        <CancelOrderButton order={order} />
      </div>
    </ProfileTitle>
  );
}