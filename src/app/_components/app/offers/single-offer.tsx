"use client";

import translate from "@/services/translate";

import { useContext } from "react";

import { DisplaySandwichTitle } from "@/components/display-sandwich-title";
import { SingleOfferItem } from "./single-offer-item";
import { LanguageContext } from "@/providers/language";
import { FullOffer } from "@/types";
import { AddOfferToCart } from "./add-to-cart";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";

type Props = {
  offer: FullOffer
  showActions?: boolean
  className?: ClassValue
}

export const SingleOffer = ({ className, showActions, offer }: Props) => {

  const language = useContext(LanguageContext)
  
  return ( 
    <div className={cn('p-4 rounded-md border flex flex-col justify-between', className)}>

      <div>
        <DisplaySandwichTitle en={offer.enTitle} ar={offer.arTitle} />
        <DisplaySandwichTitle 
          className="text-gray-500 line-clamp-1" 
          enClass="text-sm" arClass='text-sm'
          en={offer.enDescription} 
          ar={offer.arDescription} 
        />
        
        <div className="items mt-4 space-y-2">
          {offer?.offerItems?.map((menuItem) => (
            <SingleOfferItem 
              key={`menu-item-${menuItem.id}`} 
              menuItem={menuItem} 
            />
          ))}
        </div>
      </div>

      {/* Offer Price */}
      <div className="mt-2 flex justify-between items-center">
        {showActions && <AddOfferToCart offer={offer} />}
        <p className="mt-2 text-green-700 font-bold flex justify-end text-xl">{offer.price} {translate('le', language)}</p>
      </div>
    </div>
  );
}