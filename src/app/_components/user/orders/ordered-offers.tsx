import { FullOrderOffer } from "@/types";
import { SingleOffer } from "../../app/offers/single-offer";

export const OrderedOffers = ({ offers }: { offers: FullOrderOffer[] }) => {
  return (
    <div className="grid xl:grid-cols-3 gap-2">
      {offers.map((item) => (
        <SingleOffer offer={item.offer} key={`single-offer-idx-o-${item.id}`} />
      ))}
    </div>
  );
}