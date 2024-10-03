"use client";

import { Category, MenuItem } from "@prisma/client";
import { MenuItemCard } from "../menu-item/menu-item-card";
import { EmptyData } from "@/components/empty-data";
import { LanguageContext } from "@/providers/language";

import { useContext } from "react";
import { cn } from "@/lib/utils";
import { cairoFont } from "@/lib/fonts";

import translate from "@/services/translate";

type Props = {
  category: Category & { _count: { items: number }; items: MenuItem[] };
};

export const ShowCategoryData = ({ category }: Props) => {
  const language = useContext(LanguageContext);

  return (
    <div className="py-4" id={`category-${category.id}`}>
      <div
        className={cn(
          "mb-2 p-2 px-4 rounded-md text-white",
          language == "en" ? "flex-row" : "flex-row-reverse"
        )}
        style={{ backgroundColor: category.color }}
      >
        {language === "en" && (
          <p className={cn("font-bold text-2xl line-clamp-1 text-left")}>
            {category.enName}
          </p>
        )}
        {language === "ar" && (
          <p
            className={cn(
              "font-bold text-lg line-clamp-1 text-right",
              cairoFont.className
            )}
          >
            {category.arName}
          </p>
        )}
      </div>
      {category.items.length === 0 && (
        <EmptyData title={translate("noItems", language)} />
      )}
      <div className="grid xl:grid-cols-4 gap-2">
        {category.items.map((item) => (
          <MenuItemCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
