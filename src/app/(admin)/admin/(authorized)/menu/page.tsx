import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";
import { Pagination } from "@/app/(admin)/_components/common/paginate";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/types";
import { DeleteMenuItemModal } from "@/app/(admin)/_components/menu/delete-menu-modal";

import { adminRoutes } from "@/lib/routes";
import { cairoFont } from "@/lib/fonts";
import { getMenuItems } from "@/actions/menu";

import Image from "next/image";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

type Props = { searchParams: SearchParams }

const MenuItemsPage = async ({ searchParams }: Props) => {

  const data = await getMenuItems(searchParams);
  const fetchNext = await getMenuItems({ ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 });
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return ( 
    <div>

      <AdminTitle title={translate('menuItems', language)} className="mb-4">
        <Link href={adminRoutes.createMenuItem()}><Button variant='secondaryMain'>{translate('createItem', language)}</Button></Link>
      </AdminTitle>

      <FilterAll searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'enName', label: 'Name' } ]} />

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
          
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>{translate('noData', language)}</TableCell>
            </TableRow>
          )}

          {data.map((item) => (
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
                <DeleteMenuItemModal itemId={item.id}>
                  <Button size='sm' variant='main'>{translate('delete', language)}</Button>
                </DeleteMenuItemModal>
              </TableCell>
            </TableRow>
          ))} 
          
        </TableBody>

        <Pagination
          repeat={6}
          nextDisabled={fetchNext.length === 0}
          previousDisabled={Number(searchParams.page) == 1 || !searchParams.page}
        />

      </Table>

    </div>
  );
}

export default MenuItemsPage