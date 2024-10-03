import { AvailableLanguages } from "@/types";
import { SingleOffer } from "../offers/single-offer";

import { getOffersLimit } from "@/actions/offers";
import { cookieLangName } from "@/lib/constants";
import { cookies } from "next/headers";

import translate from "@/services/translate";

export const SmallListOfOffers = async () => {
  const offers = await getOffersLimit(8);
  const cookieStore = cookies();
  const language =
    (cookieStore.get(cookieLangName)?.value as AvailableLanguages) ?? "ar";

  if (offers?.length == 0) return null;

  return (
    <div className="mt-4">
      <h1 className="xl:text-3xl font-semibold text-2xl mb-2">
        {translate("hotOffers", language)}
      </h1>
      <div className="grid xl:grid-cols-4 grid-cols-1 gap-2">
        {offers.map((offer) => (
          <SingleOffer
            key={`offer-idx-${offer.id}`}
            offer={offer}
            showActions
          />
        ))}
      </div>
    </div>
  );
};
