import translate from "@/services/translate";

import { Separator } from "@/components/ui/separator";
import { LandingPageBanner } from "./_components/app/landing-page/banner";
import { SmallListOfItems } from "./_components/app/landing-page/list-of-items";
import { Navbar } from "./_components/app/navbar/navbar";
import { MobileNavbarContainer } from "./_components/app/navbar/mobile.navbar";
import { AvailableLanguages } from "@/types";
import { SmallListCategories } from "./_components/app/landing-page/list-of-categories";

import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";

import { SmallListOfOffers } from "./_components/app/landing-page/list-of-offers";
import { ShoppingCartTrigger } from "./_components/app/open-shopping-cart";
import { SmallListOfFriendsItems } from "./_components/app/landing-page/list-of-friends-offers";

export default async function Home() {
  const cookieStore = cookies();
  const language =
    (cookieStore.get(cookieLangName)?.value as AvailableLanguages) ?? "ar";

  return (
    <>
      <Navbar />
      <MobileNavbarContainer />
      <ShoppingCartTrigger />
      <div className="xl:px-16 px-4 xl:py-12 py-4 mt-[85px]">
        <LandingPageBanner />
        <div className="mt-4">
          <SmallListCategories />
        </div>

        <Separator className="my-5" />

        <div>
          <h1 className="xl:text-3xl font-semibold text-2xl mb-2">
            {translate("bestSelling", language)}
          </h1>
          <SmallListOfItems />
        </div>

        <Separator className="my-4" />

        <div>
          <h1 className="xl:text-3xl font-semibold text-2xl mb-2">
            {translate("friendsOffer", language)}
          </h1>
          <SmallListOfFriendsItems />
        </div>

        <Separator className="my-4" />

        <SmallListOfOffers />
      </div>
    </>
  );
}
