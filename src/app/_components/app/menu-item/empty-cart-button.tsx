"use client";

import { useAppDispatch } from "@/store/hooks";

import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/providers/language";

import { emptyOfferCart } from "@/store/slices/order-offer.slice";
import { emptyCart } from "@/store/slices/cart.slice";
import { useContext } from "react";

import translate from "@/services/translate";

export const EmptyCartButton = () => {

  const dispatch = useAppDispatch()
  const language = useContext(LanguageContext)

  const handleEmpty = () => {
    dispatch(emptyCart())
    dispatch(emptyOfferCart())
  }

  return ( 
    <Button onClick={handleEmpty} size='sm' variant='secondaryMain'>{translate('emptyCart', language)}</Button>
  );
  
}