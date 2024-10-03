"use client";

import Link from "next/link";
import translate from "@/services/translate";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useContext, useState } from "react";

import { emptyCart } from "@/store/slices/cart.slice";
import { emptyOfferCart } from "@/store/slices/order-offer.slice";
import { routes } from "@/lib/routes";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EmptyData } from "@/components/empty-data";
import { CartItemCard } from "../menu-item/cart-item-card";
import { Button } from "@/components/ui/button";
import { SingleOffer } from "../offers/single-offer";
import { LanguageContext } from "@/providers/language";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { trigger } from "@/store/slices/shopping-cart-sheet.slice";

export const ShoppingCartDropdown = () => {
  const cart = useAppSelector((state) => state.cart);
  const offerCart = useAppSelector((state) => state.orderOfferCart);
  const dispatch = useAppDispatch();
  const language = useContext(LanguageContext);

  const isOpen = useAppSelector((state) => state.shoppingCartSheet);

  const emptyAll = () => {
    dispatch(emptyCart());
    dispatch(emptyOfferCart());
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(trigger())}>
      <SheetTrigger asChild>
        <Button variant="default" className="relative">
          <ShoppingCart className="size-4" />
          <Badge
            className="absolute -top-2 -right-1 rounded-full p-0 size-6 text-sm flex items-center justify-center"
            variant="destructive"
          >
            {cart.length + offerCart.length}
          </Badge>
        </Button>
      </SheetTrigger>

      <SheetContent className="xl:min-w-[28%] min-w-[90%] w-[90%] h-[100vh] overflow-auto">
        <SheetHeader className="my-4">
          <SheetTitle className="flex justify-between text-3xl items-center">
            <span>{translate("shoppingCart", language)}</span>{" "}
            <span className="text-gray-500 text-sm">
              {cart.length + offerCart.length} {translate("items", language)}
            </span>
          </SheetTitle>
        </SheetHeader>
        {cart.length === 0 && offerCart?.length === 0 ? (
          <EmptyData title={translate("noItems", language)} />
        ) : (
          <div className="space-y-4">
            {offerCart?.length > 0 && (
              <div>
                <h2 className="text-xl xl:text-2xl font-medium mb-2">
                  {translate("offers", language)}
                </h2>
                <div className="grid gap-2">
                  {offerCart?.map((item) => (
                    <SingleOffer showActions offer={item} />
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {cart?.length > 0 && (
              <div>
                <h2 className="text-xl xl:text-2xl font-medium mb-2">
                  {translate("items", language)}
                </h2>
                <div className="grid gap-2">
                  {cart?.map((item) => (
                    <CartItemCard key={`item-cart-${item.id}`} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <SheetFooter className="grid grid-cols-2 gap-1 space-x-1 justify-between mt-4 mb-10">
          <Button variant="main" className="w-full" onClick={emptyAll}>
            {translate("emptyCart", language)}
          </Button>
          <Link
            href={routes.completeOrder()}
            className="w-full"
            onClick={() => dispatch(trigger())}
          >
            <Button variant="secondaryMain" className="w-full">
              {translate("order", language)}
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
