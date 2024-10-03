import { notFound } from "next/navigation";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { getOffer } from "@/actions/offers";
import { UpdateOfferForm } from "@/app/(admin)/_components/offers/update-offer-form";
import { getOrderOffers } from "@/actions/app";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateOfferPage = async ({ params }: { params: { id: string } }) => {

  const offerId = +params.id
  const offer = await getOffer(offerId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!offer) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateOffer', language)} - ${offer.enTitle}`} />
      <UpdateOfferForm offer={offer} />
    </div>
  );
}
 
export default UpdateOfferPage;