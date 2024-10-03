import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { CreateCouponForm } from "@/app/(admin)/_components/coupons/create-coupon-form";
import { CreateOfferForm } from "@/app/(admin)/_components/offers/create-offer-form";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const CreateCategoryPage = () => {
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={translate('createOffer', language)} />
      <CreateOfferForm />
    </div>
  );
}
 
export default CreateCategoryPage;