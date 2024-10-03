"use client"

import { useContext } from "react";
import { FullOffer } from "@/types";
import { SingleOffer } from "./single-offer";
import { Flame } from "lucide-react";
import { LanguageContext } from "@/providers/language";

import translate from "@/services/translate";

export const ShowOffersData = ({ offers }: { offers: FullOffer[] }) => {

  const language = useContext(LanguageContext)

  if (!offers || offers.length === 0) return null

  return ( 
    <div className="border-b pb-4">

      <h2 className="text-3xl flex gap-2 font-semibold items-center mb-2 text-main"><Flame className="size-7" /> {translate('hotOffers', language)}</h2>
      <div className="grid xl:grid-cols-3 gap-2">
        {offers.map(offer => offer.offerItems.length === 0 ? null : <SingleOffer key={`offer-${offer.id}`} showActions offer={offer} />)}
      </div>
    </div>
  );
}