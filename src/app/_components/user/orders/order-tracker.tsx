import { Check, LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

export const OrderTracker = ({ parentClassName, sepClassName, status, statusNumber }: Props) => {
  return ( 
    <div className={cn("hidden xl:flex items-center justify-center", parentClassName)}>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger><OrderTrackerItem icon={orderStatusIconList[0]} status={OrderStatus.JustOrdered} statusNumber={statusNumber} isActive={statusNumber >= 1} /></TooltipTrigger>
          <TooltipContent>
            <p>{orderStatusLabel(OrderStatus.JustOrdered)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator className={cn('max-w-[15%] hidden xl:block', sepClassName)} />
      
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger><OrderTrackerItem icon={orderStatusIconList[1]} status={OrderStatus.Reviewed} statusNumber={statusNumber} isActive={statusNumber > 1} /></TooltipTrigger>
          <TooltipContent>
            <p>{orderStatusLabel(OrderStatus.Reviewed)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator className={cn('max-w-[15%] hidden xl:block', sepClassName)} />
      
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger><OrderTrackerItem icon={orderStatusIconList[2]} status={OrderStatus.BeingCooked} statusNumber={statusNumber} isActive={statusNumber > 2} /></TooltipTrigger>
          <TooltipContent>
            <p>{orderStatusLabel(OrderStatus.BeingCooked)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator className={cn('max-w-[15%] hidden xl:block', sepClassName)} />
      
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger><OrderTrackerItem icon={orderStatusIconList[3]} status={OrderStatus.OutForDelivery} statusNumber={statusNumber} isActive={statusNumber > 3} /></TooltipTrigger>
          <TooltipContent>
            <p>{orderStatusLabel(OrderStatus.OutForDelivery)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator className={cn('max-w-[15%] hidden xl:block', sepClassName)} />
      
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger><OrderTrackerItem icon={orderStatusIconList[4]} status={OrderStatus.Delivered} statusNumber={statusNumber} isActive={statusNumber > 4} /></TooltipTrigger>
          <TooltipContent>
            <p>{orderStatusLabel(OrderStatus.Delivered)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
        
    </div>
  );
}

export const OrderTrackerItem = ({ isActive, status, icon: Icon }: { status: OrderStatus, statusNumber: number, isActive: boolean, icon: LucideIcon }) => {
  return (
    <div className='xl:flex xl:flex-col items-center justify-center relative'>
      {isActive ? (
        <div className="size-12 border rounded-full flex items-center justify-center bg-secondaryMain/10">
          <Check className="size-4 text-secondaryMain" />
        </div>
      ): (
        <div className="size-12 border rounded-full flex items-center justify-center">
          <Icon className="size-4 text-gray-500" />
        </div>
      )}
      <h4 className='text-xs font-semibold text-secondaryMain xl:absolute text-center xl:left-1/2 xl:-translate-x-1/2 xl:-bottom-4 w-32'>{orderStatusLabel(status)}</h4>
    </div>
  )
}