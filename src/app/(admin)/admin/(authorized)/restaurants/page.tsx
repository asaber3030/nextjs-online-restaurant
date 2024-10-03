import Link from "next/link";
import Image from "next/image";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { Button } from "@/components/ui/button";

import { adminRoutes } from "@/lib/routes";
import { getMainRestaurants } from "@/actions/restaurants";

import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

const RestaurantsPage = async () => {

  const data = await getMainRestaurants();
  const cookiesStore = cookies()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return ( 
    <div>

      <AdminTitle title={translate('restaurants', language)} className="mb-4" />

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">{translate('id', language)}</TableHead>
            <TableHead>{translate('logo', language)}</TableHead>
            <TableHead>{translate('name', language)}</TableHead>
            <TableHead>{translate('location', language)}</TableHead>
            <TableHead>{translate('mainPhone', language)}</TableHead>
            <TableHead>{translate('fb', language)}</TableHead>
            <TableHead>{translate('insta', language)}</TableHead>
            <TableHead>{translate('actions', language)}</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={6}>{translate('noData', language)}</TableCell>
            </TableRow>
          )}
          {data.map((res) => (
            <TableRow key={res.id}>
              <TableCell className="font-medium">{res.id}</TableCell>
              <TableCell><Image alt='logo' src={res.logo} width={40} height={40} /></TableCell>
              <TableCell>{res.name}</TableCell>
              <TableCell>{res.location}</TableCell>
              <TableCell>{res.mainPhone}</TableCell>
              <TableCell><a className="text-xs text-blue-600 hover:underline" href={res.facebookUrl} target='_blank'>{translate('facebookUrl', language)}</a></TableCell>
              <TableCell><a className="text-xs text-blue-600 hover:underline" href={res.instagramUrl} target='_blank'>{translate('instagramUrl', language)}</a></TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateRestaurant(res.id)}><Button size='sm' variant='outline'>{translate('update', language)}</Button></Link>
                <Link href={adminRoutes.viewRestaurant(res.id)}><Button size='sm'>{translate('view', language)}</Button></Link>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>

      </Table>

    </div>
  );
}

export default RestaurantsPage