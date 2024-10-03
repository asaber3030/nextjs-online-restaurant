import { notFound } from "next/navigation";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { getResturants } from "@/actions/app";
import { getRestaurantById } from "@/actions/restaurants";
import { UpdateRestaurantForm } from "@/app/(admin)/_components/restaurants/update-restaurant-form";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const UpdateRestaurantPage = async ({ params }: { params: { id: string } }) => {

  const restaurantId = +params.id
  const res = await getRestaurantById(restaurantId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!res) return notFound()

  return (
    <div>
      <AdminTitle title={`${translate('updateRestaurant', language)} - ${res?.name}`} />
      <UpdateRestaurantForm restaurant={res} />
    </div>
  );
}
 
export default UpdateRestaurantPage;