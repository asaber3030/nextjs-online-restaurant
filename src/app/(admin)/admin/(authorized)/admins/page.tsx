import Link from "next/link"
import translate from "@/services/translate"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title"
import { FilterAll } from "@/app/(admin)/_components/common/filter/filter-all"
import { Pagination } from "@/app/(admin)/_components/common/paginate"
import { Button } from "@/components/ui/button"
import { SearchParams } from "@/types"
import { DeleteAdminModal } from "@/app/(admin)/_components/admins/delete-admin-modal"

import { adminRoutes } from "@/lib/routes"
import { getAdmins } from "@/actions/admin"

import { cookies } from "next/headers"
import { AvailableLanguages } from "@/types"
import { cookieLangName } from "@/lib/constants"

type Props = { searchParams: SearchParams }

const AdminsPage = async ({ searchParams }: Props) => {
  const data = await getAdmins(searchParams)
  const fetchNext = await getAdmins({ ...searchParams, page: searchParams?.page ? +searchParams.page + 1 : 2 })
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? "ar") as AvailableLanguages

  return (
    <div>
      <AdminTitle title="Admins" className="mb-4">
        <Link href={adminRoutes.createAdmin()}>
          <Button variant="secondaryMain">{translate("createAdmin", language)}</Button>
        </Link>
      </AdminTitle>

      <FilterAll
        searchParams={searchParams}
        orderByArray={[
          { name: "id", label: "ID" },
          { name: "name", label: "Name" },
        ]}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{translate("id", language)}</TableHead>
            <TableHead>{translate("name", language)}</TableHead>
            <TableHead>{translate("email", language)}</TableHead>
            <TableHead>{translate("phone", language)}</TableHead>
            <TableHead>{translate("actions", language)}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>
                {translate("noData", language)}
              </TableCell>
            </TableRow>
          )}
          {data.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell className="font-medium">{admin.id}</TableCell>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.phoneNumber}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateAdmin(admin.id)}>
                  <Button size="sm" variant="outline">
                    {translate("update", language)}
                  </Button>
                </Link>
                <DeleteAdminModal adminId={admin.id}>
                  <Button size="sm" variant="main">
                    {translate("delete", language)}
                  </Button>
                </DeleteAdminModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <Pagination repeat={3} nextDisabled={fetchNext.length === 0} previousDisabled={Number(searchParams.page) == 1 || !searchParams.page} />
      </Table>
    </div>
  )
}

export default AdminsPage
