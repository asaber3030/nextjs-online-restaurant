"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { addToCart, removeFromCart } from "@/store/slices/cart.slice";

import { Button } from "@/components/ui/button";
import { MenuItem } from "@prisma/client";
import { Check, Plus, ShoppingCart } from "lucide-react";

type Props = { item: MenuItem }

export const AddToCart = ({ item }: Props) => {

  const cart = useAppSelector(state => state.cart)
  const isItemAdded = cart.find(x => x.id == item.id)
  const dispatch = useAppDispatch()

  const handleAdd = () => {
    dispatch(addToCart({
      id: item.id,
      arName: item.arName,
      enName: item.enName,
      description: item.description,
      categoryId: item.categoryId,
      quantity: 1,
      unitPrice: item.price,
      image: item.image,
      totalPrice: item.price
    }))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  if (isItemAdded) {
    return (
      <Button onClick={handleRemove} size='sm' variant='secondaryMain'><Check className='size-4' /></Button>
    )
  }
  
  return ( 
    <Button onClick={handleAdd} size='sm' variant='outline'><Plus className='size-4' /></Button>
  );
}