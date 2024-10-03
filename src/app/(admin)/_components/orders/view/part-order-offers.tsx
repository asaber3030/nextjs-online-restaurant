import { SingleOffer } from "@/app/_components/app/offers/single-offer";
import { adminRoutes } from "@/lib/routes";
import { FullOrderOffer } from "@/types";

import Link from "next/link";

type Props = {
  offers: FullOrderOffer[]
}

export const PartOrderOffers = ({ offers }: Props) => {
  if (offers.length == 0) return null
  return ( 
    <div className="mt-4">
      <h3 className="font-bold text-2xl mb-2">Offers</h3>
      {offers.map(item => (
        <Link href={adminRoutes.updateOffer(item.offerId)} className="my-2 block">
          <SingleOffer className='bg-white shadow-sm hover:border-secondaryMain cursor-pointer transition-all' key={item.id} offer={item.offer} /> 
        </Link>
      ))} 
    </div>
  );
}