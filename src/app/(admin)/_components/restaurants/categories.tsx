import { Category } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import { cairoFont } from "@/lib/fonts";
import { adminRoutes } from "@/lib/routes";

import Link from "next/link";

type Props = {
  categories: (Category & { _count: { items: number } })[],
}

export const ViewRestaurantCategoriesTable = ({ categories }: Props) => {
  return ( 
    <div>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>English Name</TableHead>
            <TableHead>Arabic Name</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-xl font-medium text-orange-600" colSpan={5}>No data.</TableCell>
            </TableRow>
          )}
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.enName}</TableCell>
              <TableCell className={cairoFont.className}>{category.arName}</TableCell>
              <TableCell>{category._count.items} item</TableCell>
              <TableCell className="flex gap-2">
                <Link href={adminRoutes.updateCategory(category.id)}><Button size='sm' variant='outline'>Update</Button></Link>
                <Link href={adminRoutes.categoryItems(category.id)}><Button size='sm'>Items</Button></Link>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>

      </Table>

    </div>
  );
}