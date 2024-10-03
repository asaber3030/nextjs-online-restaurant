import { notFound } from "next/navigation";
import { getOrder, getOrderAddress, getOrderItems, getOrderUser } from "@/actions/orders";
import { getOrderOffers } from "@/actions/app";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { ViewOrderDetails } from "@/app/(admin)/_components/orders/view/view-order";
import { Separator } from "@/components/ui/separator";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";
import { UpdateOrderButton } from "@/app/(admin)/_components/orders/update-order-button";
import { Badge } from "@/components/ui/badge";
import { orderStatusBadge, orderStatusLabel } from "@/lib/utils";

const ViewOrderPage = async ({ params }: { params: { id: string } }) => {

  const orderId = +params.id
  const order = await getOrder(orderId)

  if (!order) return notFound()

  const address = await getOrderAddress(order.addressId)
  const offers = await getOrderOffers(order.id)
  const items = await getOrderItems(order.id)
  const user = await getOrderUser(order.id)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!address) return notFound()

  return (
    <div>
      <AdminTitle className="pb-4 xl:flex xl:flex-row flex-col" title={`${translate('viewOrder', language)} - #${order.id}`}>
        <Badge className="rounded-md" variant={orderStatusBadge(order.status)}>{orderStatusLabel(order.status)}</Badge>
        <UpdateOrderButton 
          status={order.status}
          statusNumber={order.statusNumber}
          orderId={order.id}
          variant='outline'
        />
      </AdminTitle>
      <Separator className="mb-4" />
      <ViewOrderDetails 
        offers={offers}
        items={items}
        address={address}
        order={order}
        user={user}
      />
    </div>
  );
}
 
export default ViewOrderPage;