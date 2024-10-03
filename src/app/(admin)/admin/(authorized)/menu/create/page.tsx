import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { CreateCouponForm } from "@/app/(admin)/_components/coupons/create-coupon-form";
import { CreateMenuItemForm } from "@/app/(admin)/_components/menu/create-menu-form";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const CreateMenuItemPage = () => {
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={translate('createMenuItem', language)} />
      <CreateMenuItemForm />
    </div>
  );
}
 
export default CreateMenuItemPage;