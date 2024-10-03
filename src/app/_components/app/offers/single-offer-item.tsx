import { DisplaySandwichTitle } from "@/components/display-sandwich-title";
import { MenuItem, OfferItems } from "@prisma/client";

import Image from "next/image";

type Props = {
  menuItem: OfferItems & { item: MenuItem }
}

export const SingleOfferItem = ({ menuItem }: Props) => {

  return ( 
    <div key={`menu-item-${menuItem.id}`} className="flex gap-3 items-center">
      <Image alt='Item' src={menuItem.item.image} width={60} height={60} />
      <div>
        <DisplaySandwichTitle en={menuItem.item.enName} ar={menuItem.item.arName} className="justify-start gap-4 xl:text-xl text-lg font-medium" enClass='text-lg' arClass='text-lg' />
        <p className="text-lg font-bold text-secondaryMain">{menuItem.quantity}</p>
      </div>
    </div>
  );
}