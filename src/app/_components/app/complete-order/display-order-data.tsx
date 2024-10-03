"use client"

import Link from "next/link";

import { useAppSelector } from "@/store/hooks";
import { useContext } from "react";
import { routes } from "@/lib/routes";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/providers/language";
import { EmptyCartButton } from "../menu-item/empty-cart-button";
import { SingleOffer } from "../offers/single-offer";
import { CartItemCard } from "../menu-item/cart-item-card";
import { Fragment } from "react";

import translate from "@/services/translate";

export const DisplayOrderData = () => {

  const cart = useAppSelector(state => state.cart)
  const orderCart = useAppSelector(state => state.orderOfferCart)
  const language = useContext(LanguageContext)

  return ( 
    <div>
      <div className="col-span-6 space-y-2">
        {(cart.length > 0 || orderCart.length > 0) ? (
          <div>
            
            <div className="grid xl:grid-cols-3 gap-2 mb-2">
              {cart.map(item => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
            
            <div className="grid xl:grid-cols-3 grid-cols-1 gap-2 my-2">
              {orderCart.map(item => (
                <SingleOffer showActions key={item.id} offer={item} />
              ))}
            </div>

            
          </div>
        ): (
          <Fragment>
            <EmptyState title={translate('noItems', language)} />
            <Link href={routes.menu()}><Button className="mt-2" variant='secondaryMain'>{translate('continueOrdering', language)}</Button></Link>
          </Fragment>
        )}
        
      </div>
      
    </div>
  );
}