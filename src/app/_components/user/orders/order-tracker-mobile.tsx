import { Check, LucideIcon } from "lucide-react";
import { OrderStatus } from "@prisma/client";
import { ClassValue } from "clsx";

import { orderStatusIconList } from "@/lib/lists";
import { cn, orderStatusLabel } from "@/lib/utils";

type Props = {
  status: OrderStatus
  statusNumber: number,
  parentClassName?: ClassValue,
  sepClassName?: ClassValue
}

export const OrderTrackerMobile = ({ parentClassName, sepClassName, status, statusNumber }: Props) => {
  return ( 
    <div className={cn("xl:hidden", parentClassName)}>
      <OrderTrackerItem icon={orderStatusIconList[0]} status={OrderStatus.JustOrdered} statusNumber={statusNumber} isActive={statusNumber >= 1} />
      <OrderTrackerItem icon={orderStatusIconList[1]} status={OrderStatus.Reviewed} statusNumber={statusNumber} isActive={statusNumber > 1} />
      <OrderTrackerItem icon={orderStatusIconList[2]} status={OrderStatus.BeingCooked} statusNumber={statusNumber} isActive={statusNumber > 2} />
      <OrderTrackerItem icon={orderStatusIconList[3]} status={OrderStatus.OutForDelivery} statusNumber={statusNumber} isActive={statusNumber > 3} />
      <OrderTrackerItem icon={orderStatusIconList[4]} status={OrderStatus.Delivered} statusNumber={statusNumber} isActive={statusNumber > 4} />
    </div>
  );
}

export const OrderTrackerItem = ({ isActive, status, icon: Icon }: { status: OrderStatus, statusNumber: number, isActive: boolean, icon: LucideIcon }) => {
  return (
    <div className='flex gap-2 items-center relative mb-4'>
      {isActive ? (
        <div className="size-12 border rounded-full flex items-center justify-center bg-secondaryMain/10">
          <Check className="size-4 text-secondaryMain" />
        </div>
      ): (
        <div className="size-12 border rounded-full flex items-center justify-center">
          <Icon className="size-4 text-gray-500" />
        </div>
      )}
      <h4 className={cn('text-xs font-semibold', isActive && 'text-secondaryMain')}>{orderStatusLabel(status)}</h4>
    </div>
  )
}