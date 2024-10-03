"use client";

import translate from "@/services/translate";
import Image from "next/image";

import { useContext } from "react";

import { cairoFont } from "@/lib/fonts";
import { MenuItem } from "@prisma/client";
import { MenuItemActions } from "./actions";

import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ClassValue } from "class-variance-authority/types";
import { LanguageContext } from "@/providers/language";
import { Flame } from "lucide-react";

type Props = {
  item: MenuItem;
  className?: ClassValue;
  showAction?: boolean;
};

export const MenuItemCard = ({ showAction = true, className, item }: Props) => {
  const language = useContext(LanguageContext);

  return (
    <div
      className={cn(
        "border relative h-fit p-2 px-3 rounded-md shadow-sm",
        className
      )}
      key={item?.id}
    >
      {Number(item?.offerPrice) > 0 && (
        <span
          className={cn(
            "absolute font-semibold left-2 top-2 flex gap-2 text-red-800 items-center",
            language === "en" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Flame className="text-main size-4" />
          Hot Offer
        </span>
      )}

      <div className="flex gap-4 items-start">
        <Image
          alt="Sandwich"
          width={60}
          height={60}
          src={item.image}
          className="object-contain rounded-md"
        />

        <div className="flex flex-col gap-2 justify-between w-full">
          <h2
            className={cn(
              item.arName && cairoFont.className,
              "grid grid-cols-2 font-medium justify-between xl:text-xl text-lg line-clamp-1"
            )}
          >
            {language == "en" ? item.enName : item.arName}
          </h2>

          <div className="flex text-xs gap-1">
            {item.ingredients?.split(",").map((item) => (
              <Badge className="rounded-md" variant="outline">
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 items-center justify-between w-full">
            <div className="flex gap-2 items-center w-full">
              <p
                className={cn(
                  "text-green-700 font-semibold xl:text-lg text-sm"
                )}
              >
                {formatNumber(item.price)} {translate("le", language)}
              </p>
              {Number(item?.offerPrice) > 0 && (
                <p
                  className={cn(
                    "text-gray-500 line-through font-semibold text-xs"
                  )}
                >
                  {formatNumber(item.price)} {translate("le", language)}
                </p>
              )}
            </div>

            {showAction && <MenuItemActions item={item} />}
          </div>
        </div>
      </div>
    </div>
  );
};
