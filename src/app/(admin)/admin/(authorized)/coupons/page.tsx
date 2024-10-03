import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";
import { Pagination } from "@/app/(admin)/_components/common/paginate";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/types";

import { adminRoutes, routes } from "@/lib/routes";
import { getCategories } from "@/actions/categories";
import { cairoFont } from "@/lib/fonts";
import { DeleteCategoryModal } from "@/app/(admin)/_components/categories/delete-category-modal";
import { getCoupons } from "@/actions/coupons";
import { DeleteCouponModal } from "@/app/(admin)/_components/coupons/delete-coupon-modal";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

type Props = { searchParams: SearchParams }

const CouponsPage = async ({ searchParams }: Props) => {

  const data = await getCoupons(searchParams);
  const fetchNext = await getCoupons({ ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 });
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return ( 
    <div>

      <AdminTitle title={translate('coupons', language)} className="mb-4">
        <Link href={adminRoutes.createCoupon()}><Button variant='secondaryMain'>{translate('createCoupon', language)}</Button></Link>
      </AdminTitle>

      <FilterAll searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'name', label: 'Name' } ]} />

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('name', language)}</TableHead>
            <TableHead>{translate('usages', language)}</TableHead>
            <TableHead>{translate('discount', language)}</TableHead>
            <TableHead>{translate('active', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>{translate('noData', language)}</TableCell>
            </TableRow>
          )}
          {data.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell className="font-medium">{coupon.id}</TableCell>
              <TableCell>{coupon.name}</TableCell>
              <TableCell className={cairoFont.className}>{coupon.usages}</TableCell>
              <TableCell>{coupon.discount}%</TableCell>
              <TableCell>{coupon.active ? 'Yes' : 'No'}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateCoupon(coupon.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
                <DeleteCouponModal couponId={coupon.id}>
                  <Button size='sm' variant='main'>{translate('delete', language)}</Button>
                </DeleteCouponModal>
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

export default CouponsPage