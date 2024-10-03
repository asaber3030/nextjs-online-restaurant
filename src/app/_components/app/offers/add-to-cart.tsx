"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, ShoppingCart } from "lucide-react";
import { LanguageContext } from "@/providers/language";
import { FullOffer } from "@/types";

import { addOfferToCart, removeOfferFromCart } from "@/store/slices/order-offer.slice";

import translate from "@/services/translate";

type Props = {
  offer: FullOffer,
}

export const AddOfferToCart = ({ offer }: Props) => {

  const cart = useAppSelector(state => state.orderOfferCart)
  const isItemAdded = cart.find(x => x.id == offer.id)
  const dispatch = useAppDispatch()
  const language = useContext(LanguageContext)

  const handleAdd = () => {
    dispatch(addOfferToCart(offer))
  }

  const handleRemove = () => {
    dispatch(removeOfferFromCart(offer.id))
  }

  if (isItemAdded) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleRemove} size='sm' variant='secondaryMain'><Check className='size-4' /> {translate('added', language)}</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{translate('remove', language)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  return ( 
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleAdd} size='sm' variant='outline'><ShoppingCart className='size-4' /> {translate('addToCart', language)}</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{translate('addToCart', language)} </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}