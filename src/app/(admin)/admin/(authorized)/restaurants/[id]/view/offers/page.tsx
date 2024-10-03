import Link from "next/link";

import { adminRoutes } from "@/lib/routes";
import { notFound } from "next/navigation";
import { getOffersByRes, getRestaurantById } from "@/actions/restaurants";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { cairoFont } from "@/lib/fonts";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const ViewRestaurantOffersPage = async ({ params }: { params: { id: string } }) => {

  const restaurantId = +params.id
  const res = await getRestaurantById(restaurantId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!res) return notFound()
  
  const offers = await getOffersByRes(res.id)

  return (
    <div>
      <AdminTitle title={`${translate('restaurantOffers', language)} - ${res?.name}`} className="mb-4" />

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('englishTitle', language)}</TableHead>
            <TableHead>{translate('arabicTitle', language)}</TableHead>
            <TableHead>{translate('oldPrice', language)}</TableHead>
            <TableHead>{translate('newPrice', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {offers.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>{translate('noData', language)}</TableCell>
            </TableRow>
          )}
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">{offer.id}</TableCell>
              <TableCell>{offer.enTitle}</TableCell>
              <TableCell className={cairoFont.className}>{offer.arTitle}</TableCell>
              <TableCell className="font-medium text-green-500">{offer.offerPrice} {translate('le', language)}</TableCell>
              <TableCell className="font-medium text-green-500">{offer.price} {translate('le', language)}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateOffer(offer.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>

      </Table>

    </div>
  );
}
 
export default ViewRestaurantOffersPage;