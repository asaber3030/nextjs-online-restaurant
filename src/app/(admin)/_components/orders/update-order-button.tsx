"use client";

import { ClassValue } from "class-variance-authority/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";
import { OrderStatus } from "@prisma/client";
import { OrderStatusArray } from "@/lib/lists";
import { Badge } from "@/components/ui/badge";
import { cn, orderStatusBadge, orderStatusLabel } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { changeOrderStatus } from "@/actions/orders";
import { toast } from "sonner";
import { responseCodes } from "@/lib/response";

type Props = {
  className?: ClassValue
  status: OrderStatus
  statusNumber: number
  orderId: number,
  variant?: string
}

export const UpdateOrderButton = ({ variant = 'default', className, status, statusNumber, orderId }: Props) => {
  
  const language = useContext(LanguageContext)

  const [open, setOpen] = useState(false)

  const [currentStatus, setStatus] = useState(status)
  const [currentStatusNumber, setStatusNumber] = useState(statusNumber)

  const mutation = useMutation({
    mutationFn: () => changeOrderStatus(orderId, currentStatus, currentStatusNumber),
    onSuccess: (data) => {
      toast.message(data?.message)
      if (data.status === responseCodes.ok) {
        setOpen(false)
      }
    }
  })

  const handleUpdate = () => {
    mutation.mutate()
  }

  return ( 
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant={variant as any} disabled={status === OrderStatus.Delivered} className={cn(className)}>{translate('changeStatus', language)}</Button></DialogTrigger>
      <DialogContent className="xl:min-w-[700px] w-[600px]">
        <DialogHeader>
          <DialogTitle>{translate('changeOrderStatus', language)} - {translate('order', language)} #{orderId}</DialogTitle>
        </DialogHeader>
        <div className="grid xl:grid-cols-5 grid-cols-1 gap-2 items-center">
          {OrderStatusArray.map((item, idx) => (
            <Badge 
              className={cn('text-lg rounded-md cursor-pointer block w-full', currentStatus === item && 'cursor-not-allowed opacity-55')} 
              variant={orderStatusBadge(item)} 
              key={item}
              onClick={() => { setStatus(item); setStatusNumber(idx + 1) }}
            >
              {orderStatusLabel(item)}
            </Badge>
          ))}
        </div>
        <DialogFooter className='flex gap-2'>
          <Button disabled={status === OrderStatus.Delivered} onClick={handleUpdate}>{translate('update', language)}</Button>
          <DialogClose asChild><Button variant='outline'>{translate('cancel', language)}</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}