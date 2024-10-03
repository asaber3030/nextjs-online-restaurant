"use client";

import Image from "next/image";

import { FullOrderItem, FullOrderOffer } from "@/types";
import { Address, Coupon, Order, User } from "@prisma/client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils";

import { PartOrderItems } from "./part-view-order-items";
import { PartOrderOffers } from "./part-order-offers";
import { PartOrderUser } from "./part-order-user";
import { PartOrderAddress } from "./part-order-address";
import { PartOrderSummary } from "./part-order-summary";

type Props = {
  order: Order & {
    _count: { items: number }
    coupon: Coupon | null
  }
  user: Omit<User, "password">
  address: Address
  items: FullOrderItem[]
  offers: FullOrderOffer[]
}

export const ViewOrderDetails = ({ user, order, address, items, offers }: Props) => {

  console.log({ offers })

  return ( 
    <div className="w-full mt-4">
 
      <div className="flex flex-col">

        <main className="flex flex-1 flex-col gap-4">

          <div className="flex flex-col md:grid md:grid-cols-6 gap-2">
            
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-2">
              <PartOrderItems items={items} />
              <PartOrderOffers offers={offers} />
            </div>

            <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-2">

              {/* User */}
              <PartOrderUser user={user} />

              {/* Shipping Address */}
              <PartOrderAddress address={address} />

              {/* Order Summary */}
              <PartOrderSummary order={order} />
              
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}