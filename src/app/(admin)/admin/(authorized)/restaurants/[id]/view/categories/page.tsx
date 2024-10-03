import { notFound } from "next/navigation";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { getCategoriesByRes,  getRestaurantById } from "@/actions/restaurants";
import { ViewRestaurantCategoriesTable } from "@/app/(admin)/_components/restaurants/categories";
import { SearchParams } from "@/types";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const ViewRestaurantCategoriesPage = async ({ searchParams, params }: { searchParams: SearchParams, params: { id: string } }) => {

  const restaurantId = +params.id
  const res = await getRestaurantById(restaurantId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!res) return notFound()
  
  const categories = await getCategoriesByRes(res.id)

  return (
    <div>
      <AdminTitle title={`${translate('restaurantCategories', language)} - ${res?.name}`} className="mb-4" />
      <ViewRestaurantCategoriesTable
        categories={categories}
      />
    </div>
  );
}
 
export default ViewRestaurantCategoriesPage;