"use client"

import { Button } from "@/components/ui/button";
import { DecreaseQuantityButton } from "./decrease-quantity";
import { IncreaseQuantityButton } from "./increase-quantity";

import { useAppDispatch } from "@/store/hooks";
import { removeFromCart } from "@/store/slices/cart.slice";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";
import { cn } from "@/lib/utils";

type Props = {
  itemId: number 
  quantity: number
}

export const CartItemActions = ({ itemId, quantity }: Props) => {

  const dispatch = useAppDispatch()
  const language = useContext(LanguageContext)

  return ( 
    <div className="flex items-center justify-between">
      <Button onClick={() => dispatch(removeFromCart(itemId))} size='sm' variant='secondary' className='transition-all hover:bg-gray-200'>{translate('remove', language)}</Button>
      <div className="flex items-center justify-end">
        <DecreaseQuantityButton itemId={itemId} className={cn(language === 'en' ? "rounded-none rounded-bl-md rounded-tl-md" : "rounded-none rounded-tr-md rounded-br-md")} />
        <p className="border-t border-b h-8 w-12 font-medium text-sm flex items-center justify-center">x{quantity}</p>
        <IncreaseQuantityButton itemId={itemId} className={cn(language === 'en' ? "rounded-none rounded-tr-md rounded-br-md" : "rounded-none rounded-tl-md rounded-bl-md")} />
      </div>
    </div>
  );
}