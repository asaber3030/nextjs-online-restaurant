import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";
import { Pagination } from "@/app/(admin)/_components/common/paginate";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/types";

import { adminRoutes } from "@/lib/routes";
import { getUsers } from "@/actions/user";
import { DeleteUserModal } from "@/app/(admin)/_components/users/delete-user-modal";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

type Props = { searchParams: SearchParams }

const UsersPage = async ({ searchParams }: Props) => {

  const data = await getUsers(searchParams);
  const fetchNext = await getUsers({ ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 });
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return ( 
    <div>

      <AdminTitle title={translate('users', language)} className="mb-4">
        <Link href={adminRoutes.createUser()}><Button variant='secondaryMain'>{translate('createUser', language)}</Button></Link>
      </AdminTitle>

      <FilterAll searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'name', label: 'Name' } ]} />

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('name', language)}</TableHead>
            <TableHead>{translate('email', language)}</TableHead>
            <TableHead>{translate('phone', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>{translate('noData', language)}</TableCell>
            </TableRow>
          )}
          {data.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell className="font-medium">{admin.id}</TableCell>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.phoneNumber}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateUser(admin.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
                <Link href={adminRoutes.userOrders(admin.id)}><Button size='sm'>{translate('orders', language)}</Button></Link>
                <DeleteUserModal userId={admin.id}>
                  <Button size='sm' variant='main'>{translate('delete', language)}</Button>
                </DeleteUserModal>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>

        <Pagination
          repeat={3}
          nextDisabled={fetchNext.length === 0}
          previousDisabled={Number(searchParams.page) == 1 || !searchParams.page}
        />

      </Table>

    </div>
  );
}

export default UsersPage