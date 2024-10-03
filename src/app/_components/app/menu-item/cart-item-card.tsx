"use client";

import translate from "@/services/translate";
import Image from "next/image";

import { useContext } from "react";

import { CartItem } from "@/types";
import { CartItemActions } from "./cart-item-actions";
import { LanguageContext } from "@/providers/language";

import { cairoFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type Props = {
  item: CartItem;
};

export const CartItemCard = ({ item }: Props) => {
  const language = useContext(LanguageContext);

  return (
    <div
      className="border p-2 px-3 rounded-md shadow-sm cursor-pointer transition-all hover:border-secondaryMain"
      key={item?.id}
    >
      <div className="flex gap-4">
        <Image
          alt="Sandwich"
          width={70}
          height={70}
          src={item.image}
          className="size-20"
        />
        <div className="w-full">
          <h2
            className={cn(
              language == "ar" && cairoFont.className,
              "flex justify-between font-semibold xl:text-lg text-sm w-full"
            )}
          >
            {language === "en" ? item.enName : item.arName}
          </h2>
          <p className={cn("text-sm flex gap-2 items-center")}>
            <span className="text-sm text-secondaryMain font-medium">
              x{item.quantity}
            </span>
            <span className="text-green-700 font-medium xl:text-lg text-sm">
              {item.totalPrice} {translate("le", language)}
            </span>
          </p>
        </div>
      </div>
      <CartItemActions itemId={item.id} quantity={item.quantity} />
    </div>
  );
};
