"use client"

import { FullOrder, FullOrderOffer } from "@/types";
import { OrderTracker } from "@/app/_components/user/orders/order-tracker";
import { OrderSummaryCard } from "./order-summary-card";
import { OrderAdressCard } from "./order-address-card";
import { OrderCouponCard } from "./order-coupon-card";
import { SingleOrderItem } from "./single-order-item";
import { OrderTitle } from "./order-title";
import { OrderTrackerMobile } from "./order-tracker-mobile";
import { OrderedOffers } from "./ordered-offers";
import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";
import { EmptyData } from "@/components/empty-data";

type Props = {
  order: FullOrder
  offers: FullOrderOffer[]
}

export const SingleOrder = ({ order, offers }: Props) => {

  const language = useContext(LanguageContext)

  return ( 
    <div>

      <OrderTitle order={order} />

      <div className='mb-8'>
        <h2 className="font-semibold text-xl mb-2">{translate('tracker', language)}</h2>
        <OrderTracker statusNumber={order.statusNumber} status={order.status} />
        <OrderTrackerMobile statusNumber={order.statusNumber} status={order.status} />
      </div>

      <div className='mb-4'>
        <h2 className="font-semibold text-xl mb-2">{translate('orderedItems', language)}</h2>
        {order.items.length === 0 ? (
          <EmptyData title={translate('noData', language)} />
        ): (
          <div className="grid xl:grid-cols-4 grid-cols-1 gap-2">
            {order.items.map((item) => (
              <SingleOrderItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className='mb-4'>
        <h2 className="font-semibold text-xl mb-2">{translate('offers', language)}</h2>
        {offers.length === 0 ? (
          <EmptyData title={translate('noData', language)} />
        ): (
          <OrderedOffers offers={offers} />
        )}
      </div>

      <div className='mb-2'>

        <div className='mb-4'>
          <h2 className="font-semibold text-xl">{translate('details', language)}</h2>
          <p className='text-xs text-gray-500'>{translate('youHaveOrdered', language)} <span className='font-bold'>{order.items.length} {translate('items', language)}</span> {translate('withTotalMoney', language)} <span className='font-bold'>{order.total} {translate('le', language)}</span></p>
          <ul className="mt-4 grid xl:grid-cols-4 grid-cols-1 gap-2">
            <OrderSummaryCard order={order} />
            <OrderAdressCard order={order} />
            <OrderCouponCard order={order} />
          </ul>
        </div>
      </div>
    </div>
  );
}