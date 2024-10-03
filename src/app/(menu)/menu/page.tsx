import { getCategories, getCurrentResturant, getResturantOffers } from "@/actions/app";
import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { ChefHat } from "lucide-react";
import { Logo } from "@/components/logo";
import { ShowCategoryData } from "@/app/_components/app/categories/show-category-data";
import { ShowOffersData } from "@/app/_components/app/offers/show-offers-data";

import { AvailableLanguages } from "@/types";

import translate from "@/services/translate";

const MenuPage = async () => {
  
  const res = await getCurrentResturant()
  const categories = await getCategories()
  const offers = await getResturantOffers()
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages
  
  return (
    <div>
      <header className={cn("flex justify-between items-center mb-4 border bg-gray-100 p-2 px-4 shadow-sm rounded-md")}>
        <h3 className="font-bold text-2xl flex gap-2 items-center"><ChefHat className="size-6 text-gray-500" /> {translate('menu', language)}</h3>
        <Logo logo={res?.logo} appName={res?.name} showAppName={false} />
      </header>

      <ShowOffersData offers={offers} />
      
      <h2 className="text-3xl flex gap-2 font-semibold items-center my-6 mb-4 text-main">{translate('categories', language)}</h2>
      <div className="divide-y">
        {categories.map(category => (
          <ShowCategoryData key={`category-${category.id}`} category={category} />
        ))}
      </div>

    </div>
  );
}
 
export default MenuPage;