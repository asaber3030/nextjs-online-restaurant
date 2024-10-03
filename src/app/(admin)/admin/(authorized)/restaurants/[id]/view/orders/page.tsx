import Link from "next/link";

import { adminRoutes } from "@/lib/routes";
import { notFound } from "next/navigation";
import { formatDate, orderStatusBadge, orderStatusLabel } from "@/lib/utils";
import { getOrdersByRes, getRestaurantById } from "@/actions/restaurants";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { SearchParams } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Pagination } from "@/app/(admin)/_components/common/paginate";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";
import { Badge } from "@/components/ui/badge";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const ViewRestaurantOrdersPage = async ({ searchParams, params }: { searchParams: SearchParams, params: { id: string } }) => {

  const restaurantId = +params.id
  const res = await getRestaurantById(restaurantId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!res) return notFound()
  
  const orders = await getOrdersByRes(res.id, searchParams)
  const nextOrders = await getOrdersByRes(res.id, { ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 })

  return (
    <div>
      <AdminTitle title={`${translate('restaurantOrders', language)} - ${res?.name}`} className="mb-4" />

      <FilterAll showSearchInput={false} searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'price', label: 'Price' } ]} />
      
      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('user', language)}</TableHead>
            <TableHead>{translate('coupon', language)}</TableHead>
            <TableHead>{translate('paymentMethod', language)}</TableHead>
            <TableHead>{translate('status', language)}</TableHead>
            <TableHead>{translate('totalItems', language)}</TableHead>
            <TableHead>{translate('discount', language)}</TableHead>
            <TableHead>{translate('delivery', language)}</TableHead>
            <TableHead>{translate('total', language)}</TableHead>
            <TableHead>{translate('orderedAt', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {orders.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>{translate('noData', language)}</TableCell>
            </TableRow>
          )}
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.coupon?.name}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell><Badge variant={orderStatusBadge(order.status)}>{orderStatusLabel(order.status)}</Badge></TableCell>
              <TableCell>{order._count.items} items</TableCell>
              <TableCell className="text-green-800">{order.discountValue} {translate('le', language)}</TableCell>
              <TableCell className="text-green-800">{order.deliveryValue} {translate('le', language)}</TableCell>
              <TableCell className="text-green-800">{order.total} {translate('le', language)}</TableCell>
              <TableCell>{formatDate(order.orderedAt)}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.viewOrder(order.id)}><Button size='sm' variant='secondaryMain'>{translate('view', language)}</Button></Link>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>

        <Pagination
          repeat={9}
          nextDisabled={nextOrders.length === 0}
          previousDisabled={Number(searchParams.page) == 1 || !searchParams.page}
        />

      </Table>
    </div>
  );
}
 
export default ViewRestaurantOrdersPage;