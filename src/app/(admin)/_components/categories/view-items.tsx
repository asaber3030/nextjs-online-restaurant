"use client"

import { MenuItemCard } from "@/app/_components/app/menu-item/menu-item-card";
import { Category, MenuItem } from "@prisma/client";
import { AdminTitle } from "../common/title";
import { adminRoutes } from "@/lib/routes";

import Link from "next/link";
import translate from "@/services/translate";
import { useContext } from "react";
import { LanguageContext } from "@/providers/language";

type Props = {
  items: MenuItem[],
  category: Category
}

export const ViewCategoryItems = ({ category, items }: Props) => {

  const language = useContext(LanguageContext)

  return ( 
    <div>
      <AdminTitle title={`${translate('categoryItems', language)} - ${category?.enName}`} />
      <div className="grid gap-2 mt-4 xl:grid-cols-3">
        {items.map(item => (
          <Link key={item.id} href={adminRoutes.updateMenuItem(item.id)}>
            <MenuItemCard showAction={false} className='bg-white' item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}