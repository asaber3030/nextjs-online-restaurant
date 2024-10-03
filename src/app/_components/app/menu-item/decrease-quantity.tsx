"use client";

import { useAppDispatch } from "@/store/hooks";

import { decreaseQuantity } from "@/store/slices/cart.slice";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";
import { Minus } from "lucide-react";

type Props = {
  itemId: number,
  className?: ClassValue,
  iconClassName?: ClassValue
}

export const DecreaseQuantityButton = ({ className, iconClassName, itemId }: Props) => {
  
  const dispatch = useAppDispatch()

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(itemId))
  }

  return ( 
    <Button onClick={handleDecreaseQuantity} className={cn(className)} size='sm' variant='outline'>
      <Minus className={cn('size-4', iconClassName)} />
    </Button>
  );
}