"use client"

import { Coupon, Order } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";

type Props = {
  order: Order & {
    _count: { items: number }
    coupon: Coupon | null
  }
}

export const PartOrderSummary = ({ order }: Props) => {

  const language = useContext(LanguageContext)

  return ( 
    <Card>
    <CardHeader>
      <CardTitle>{translate('orderSummary', language)}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>{translate('delivery', language)}</div>
        <div className="text-green-700">{order.deliveryValue} {translate('le', language)}</div>
      </div>

      <div className="flex items-center justify-between">
        <div>{translate('discount', language)}</div>
        <div className="text-green-700">{order.discountValue} {translate('le', language)}</div>
      </div>

      <div className="flex items-center justify-between">
        <div>{translate('paymentMethod', language)}</div>
        <div>{order.paymentMethod}</div>
      </div>

      <div className="flex items-center justify-between">
        <div>{translate('orderedAt', language)}</div>
        <div>{formatDate(order.orderedAt)}</div>
      </div>

      <Separator />

      <div className="flex items-center font-medium justify-between">
        <div>{translate('subTotal', language)}</div>
        <div className="text-green-700">{order.subTotal} {translate('le', language)}</div>
      </div>

      <div className="flex items-center font-medium justify-between">
        <div>{translate('total', language)}</div>
        <div className="text-green-700">{order.total} {translate('le', language)}</div>
      </div>

    </CardContent>
  </Card>
  );
}