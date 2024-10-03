import { doesUserHasAddress, getUser, getUserAddresses } from "@/actions/user";
import { DisplayOrderData } from "@/app/_components/app/complete-order/display-order-data";
import { DisplayOrderSummary } from "@/app/_components/app/complete-order/display-order-summary";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";
import { EmptyCartButton } from "@/app/_components/app/menu-item/empty-cart-button";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";

const CompleteOrderPage = async () => {

  const hasAddress = await doesUserHasAddress()
  const addresses = await getUserAddresses()
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages
  
  const user = await getUser()
  if (!user) return redirect('/login?callback=complete-order')

  return (
    <div>
      <header className="mb-4">
        <h3 className="font-bold text-2xl">{translate('completeOrder', language)}</h3>
      </header>
      <div className="xl:grid xl:grid-cols-8 grid-cols-1 gap-4">
        <DisplayOrderData />
        <DisplayOrderSummary addresses={addresses} hasAddress={hasAddress} />
      </div>
      <div className="flex gap-2 mt-4">
        <EmptyCartButton />
        <Link href={routes.menu()}><Button size='sm'>{translate('continueShopping', language)}</Button></Link>
      </div>
    </div>
  );
}
 
export default CompleteOrderPage;