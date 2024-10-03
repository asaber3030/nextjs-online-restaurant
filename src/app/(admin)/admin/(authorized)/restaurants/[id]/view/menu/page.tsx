import { cairoFont } from "@/lib/fonts";
import { adminRoutes } from "@/lib/routes";
import { notFound } from "next/navigation";

import { getMenuByRes, getRestaurantById } from "@/actions/restaurants";

import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { SearchParams } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Pagination } from "@/app/(admin)/_components/common/paginate";

import Image from "next/image";
import Link from "next/link";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const ViewRestaurantMenuPage = async ({ searchParams, params }: { searchParams: SearchParams, params: { id: string } }) => {

  const restaurantId = +params.id
  const res = await getRestaurantById(restaurantId)
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  if (!res) return notFound()
  
  const menu = await getMenuByRes(res.id, searchParams)
  const nextMenu = await getMenuByRes(res.id, { ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 })

  return (
    <div>
      <AdminTitle title={`${translate('restaurantMenu', language)} - ${res?.name}`} className="mb-4" />

      <FilterAll showSearchInput={false} searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'price', label: 'Price' } ]} />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('image', language)}</TableHead>
            <TableHead>{translate('english', language)}</TableHead>
            <TableHead>{translate('arabic', language)}</TableHead>
            <TableHead>{translate('oldPrice', language)}</TableHead>
            <TableHead>{translate('price', language)}</TableHead>
            <TableHead>{translate('category', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          
          {menu.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>No data.</TableCell>
            </TableRow>
          )}

          {menu.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell><Image alt='S' src={item.image} width={40} height={40} /></TableCell>
              <TableCell>{item.enName}</TableCell>
              <TableCell className={cairoFont.className}>{item.arName}</TableCell>
              <TableCell>{item.offerPrice}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.category.enName}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateMenuItem(item.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
              </TableCell>
            </TableRow>
          ))} 
          
        </TableBody>

        <Pagination
          repeat={6}
          nextDisabled={nextMenu.length === 0}
          previousDisabled={Number(searchParams.page) == 1 || !searchParams.page}
        />

      </Table>
    </div>
  );
}
 
export default ViewRestaurantMenuPage;