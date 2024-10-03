import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all";
import { Pagination } from "@/app/(admin)/_components/common/paginate";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/types";

import { adminRoutes } from "@/lib/routes";
import { DeleteUserModal } from "@/app/(admin)/_components/users/delete-user-modal";
import { getServiceAccounts } from "@/actions/service-accounts";
import { DeleteServiceAccountModal } from "@/app/(admin)/_components/service-accounts/delete-service-account-modal";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

type Props = { searchParams: SearchParams }

const ServiceAccountsPage = async ({ searchParams }: Props) => {

  const data = await getServiceAccounts(searchParams);
  const fetchNext = await getServiceAccounts({ ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 });
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return ( 
    <div>

      <AdminTitle title={translate('serviceAccounts', language)} className="mb-4">
        <Link href={adminRoutes.createServiceAccount()}><Button variant='secondaryMain'>{translate('createServiceAccount', language)}</Button></Link>
      </AdminTitle>

      <FilterAll searchParams={searchParams} orderByArray={[ { name: 'id', label: 'ID' }, { name: 'name', label: 'Name' } ]} />

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('name', language)}</TableHead>
            <TableHead>{translate('email', language)}</TableHead>
            <TableHead>{translate('phone', language)}</TableHead>
            <TableHead>{translate('restaurant', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>No data.</TableCell>
            </TableRow>
          )}
          {data.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.phoneNumber}</TableCell>
              <TableCell>{account.resturant.name}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateServiceAccount(account.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
                <DeleteServiceAccountModal accountId={account.id}>
                  <Button size='sm' variant='main'>{translate('delete', language)}</Button>
                </DeleteServiceAccountModal>
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

export default ServiceAccountsPage