import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";
import { Pagination } from "@/app/(admin)/_components/common/paginate";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/types";
import { DeleteCategoryModal } from "@/app/(admin)/_components/categories/delete-category-modal";
import { AvailableLanguages } from "@/types";

import { adminRoutes } from "@/lib/routes";
import { getCategories } from "@/actions/categories";
import { cairoFont } from "@/lib/fonts";

import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

type Props = { searchParams: SearchParams }

const CategoriesPage = async ({ searchParams }: Props) => {

  const data = await getCategories(searchParams);
  const fetchNext = await getCategories({ ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 });
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages
  
  return ( 
    <div>

      <AdminTitle title={translate('categories', language)} className="mb-4">
        <Link href={adminRoutes.createCategory()}><Button variant='secondaryMain'>{translate('createCategory', language)}</Button></Link>
      </AdminTitle>

      <FilterAll searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'enName', label: 'English Name' } ]} />

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('englishName', language)}</TableHead>
            <TableHead>{translate('arabicName', language)}</TableHead>
            <TableHead>{translate('color', language)}</TableHead>
            <TableHead>{translate('totalItems', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={5}>{translate('noData', language)}</TableCell>
            </TableRow>
          )}
          {data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.enName}</TableCell>
              <TableCell className={cairoFont.className}>{category.arName}</TableCell>
              <TableCell className="flex justify-center"><span className="size-7 p-1 rounded-md" style={{ backgroundColor: category.color }}></span></TableCell>
              <TableCell>{category._count.items} {translate('items', language)}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateCategory(category.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
                <Link href={adminRoutes.categoryItems(category.id)}><Button size='sm'>{translate('items', language)}</Button></Link>
                <DeleteCategoryModal categoryId={category.id}>
                  <Button size='sm' variant='main'>{translate('delete', language)}</Button>
                </DeleteCategoryModal>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>

        <Pagination 
          nextDisabled={fetchNext.length === 0}
          previousDisabled={Number(searchParams.page) == 1 || !searchParams.page}
        />

      </Table>

    </div>
  );
}

export default CategoriesPage