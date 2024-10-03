import { notFound } from "next/navigation";
import { getCategoriesByRes, getMenuByRes, getOffersByRes, getOrdersByRes, getRestaurantById } from "@/actions/restaurants";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { ViewAllItems } from "@/app/(admin)/_components/restaurants/view-all-items";
import { SearchParams } from "@/types";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateRestaurantPage = async ({ searchParams, params }: { searchParams: SearchParams, params: { id: string } }) => {

  const restaurantId = +params.id
  const res = await getRestaurantById(restaurantId)

  if (!res) return notFound()
  
  const categories = await getCategoriesByRes(res.id)
  const offers = await getOffersByRes(res.id)
  const menu = await getMenuByRes(res.id, searchParams)
  const orders = await getOrdersByRes(res.id, searchParams)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={`${translate('viewRestaurant', language)} - ${res?.name}`} className="mb-4" />
      <ViewAllItems
        resId={res.id}
        categories={categories}
        offers={offers}
        menu={menu}
        orders={orders}
      />
    </div>
  );
}
 
export default UpdateRestaurantPage;