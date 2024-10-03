import { getCoupon } from "@/actions/coupons";
import { notFound } from "next/navigation";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { UpdateCouponForm } from "@/app/(admin)/_components/coupons/update-coupon-form";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateCouponPage = async ({ params }: { params: { id: string } }) => {

  const categoryId = +params.id
  const coupon = await getCoupon(categoryId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!coupon) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateCoupon', language)} - ${coupon?.name}`} />
      <UpdateCouponForm coupon={coupon} />
    </div>
  );
}
 
export default UpdateCouponPage;