"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { trigger } from "@/store/slices/shopping-cart-sheet.slice";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const ShoppingCartTrigger = () => {
  const cart = useAppSelector((state) => state.cart);
  const offer = useAppSelector((state) => state.orderOfferCart);
  const dispatch = useAppDispatch();

  return (
    <Button
      className="border-none fixed bottom-4 left-4 z-30 size-12"
      variant="secondaryMain"
      onClick={() => dispatch(trigger())}
    >
      <>
        <span className="absolute -translate-x-3 -translate-y-3 left-0 top-0 flex items-center justify-center bg-black size-7 font-bold rounded-full text-white ">
          {cart.length + offer.length}
        </span>
        <ShoppingCart className="size-8" />
      </>
    </Button>
  );
};
