import Link from "next/link";

import { countOrders, getCurrentOrder, getOrders } from "@/actions/user";
import { orderStatusBadge, orderStatusLabel } from "@/lib/utils";
import { routes } from "@/lib/routes";

import { ProfileTitle } from "@/app/_components/user/profile.tsx/profile-title";
import { CurrentOrderBlock } from "@/app/_components/user/orders/current-order-block";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Smile } from "lucide-react";
import translate from "@/services/translate";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";
import { EmptyData } from "@/components/empty-data";


async function OrdersPage() {

  const numOfOrders = await countOrders()
  const orders = await getOrders()
  const currentOrder = await getCurrentOrder()
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      
      <CurrentOrderBlock order={currentOrder} />

      <Separator className="my-4" />

      <ProfileTitle title={translate("orders", language)}>
        <p className='text-gray-500'>{translate("orderedItems", language)} <span className='text-secondaryMain'>{numOfOrders} {translate('orders', language)}</span></p>
      </ProfileTitle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('status', language)}</TableHead>
            <TableHead>{translate('method', language)}</TableHead>
            <TableHead>{translate('usedCoupon', language)}</TableHead>
            <TableHead>{translate('addressId', language)}</TableHead>
            <TableHead>{translate('items', language)}</TableHead>
            <TableHead>{translate('discount', language)}</TableHead>
            <TableHead>{translate('deliveryTaxes', language)}</TableHead>
            <TableHead>{translate('subTotal', language)}</TableHead>
            <TableHead>{translate('total', language)}</TableHead>
            <TableHead>{translate('action', language)}</TableHead>
          </TableRow>
        </TableHeader>

        
        <TableBody>
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={11}>
                <EmptyData title={translate('noOrders', language)} />
              </TableCell>
            </TableRow>
          )}
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell><Badge variant={orderStatusBadge(order.status)}>{orderStatusLabel(order.status)}</Badge></TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order?.coupon ? order.coupon.name + "/" + order.coupon.discount + "%" : translate('nothingUsed', language)}</TableCell>
              <TableCell>{order.address.id}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>{order.discountValue}</TableCell>
              <TableCell>{order.deliveryValue}</TableCell>
              <TableCell className="font-medium text-green-500">{order.subTotal} {translate('le', language)}</TableCell>
              <TableCell className="font-medium text-green-500">{order.total} {translate('le', language)}</TableCell>
              <TableCell><Link href={routes.viewOrder(order.id)}><Button variant='link'>{translate('view', language)}</Button></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
 
export default OrdersPage;