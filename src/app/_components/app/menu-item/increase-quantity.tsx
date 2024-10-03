"use client";

import { useAppDispatch } from "@/store/hooks";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClassValue } from "clsx";

import { increaseQuantity } from "@/store/slices/cart.slice";
import { cn } from "@/lib/utils";

type Props = {
  itemId: number,
  className?: ClassValue,
  iconClassName?: ClassValue
}
export const IncreaseQuantityButton = ({ className, iconClassName, itemId }: Props) => {
  
  const dispatch = useAppDispatch()

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(itemId))
  }

  return ( 
    <Button onClick={handleIncreaseQuantity} className={cn(className)} size='sm' variant='outline'>
      <Plus className={cn('size-4', iconClassName)} />
    </Button>
  );
}