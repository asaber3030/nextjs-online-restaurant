import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";
import { Pagination } from "@/app/(admin)/_components/common/paginate";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/types";
import { DeleteCategoryModal } from "@/app/(admin)/_components/categories/delete-category-modal";

import { adminRoutes } from "@/lib/routes";
import { cairoFont } from "@/lib/fonts";
import { getOffers } from "@/actions/offers";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

type Props = { searchParams: SearchParams }

const OffersPage = async ({ searchParams }: Props) => {

  const data = await getOffers(searchParams);
  const fetchNext = await getOffers({ ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 });
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return ( 
    <div>

      <AdminTitle title={translate('offers', language)} className="mb-4">
        <Link href={adminRoutes.createOffer()}><Button variant='secondaryMain'>{translate('createOffer', language)}</Button></Link>
      </AdminTitle>

      <FilterAll searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'name', label: 'Name' } ]} />

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('englishTitle', language)}</TableHead>
            <TableHead>{translate('arabicTitle', language)}</TableHead>
            <TableHead>{translate('oldPrice', language)}</TableHead>
            <TableHead>{translate('price', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>No data.</TableCell>
            </TableRow>
          )}
          {data.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">{offer.id}</TableCell>
              <TableCell>{offer.enTitle}</TableCell>
              <TableCell className={cairoFont.className}>{offer.arTitle}</TableCell>
              <TableCell className="font-medium text-green-500">{offer.offerPrice} {translate('le', language)}</TableCell>
              <TableCell className="font-medium text-green-500">{offer.price} {translate('le', language)}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateOffer(offer.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
                <DeleteCategoryModal categoryId={offer.id}>
                  <Button size='sm' variant='main'>{translate('delete', language)}</Button>
                </DeleteCategoryModal>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>

        <Pagination
          repeat={4}
          nextDisabled={fetchNext.length === 0}
          previousDisabled={Number(searchParams.page) == 1 || !searchParams.page}
        />

      </Table>

    </div>
  );
}

export default OffersPage