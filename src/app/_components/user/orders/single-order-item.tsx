"use client";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";


import Image from "next/image";

import { MenuItem, OrderItem } from "@prisma/client";
import { Separator } from "@/components/ui/separator";

import { DisplaySandwichTitle } from "@/components/display-sandwich-title";

type Props = {
  item: OrderItem & { item: MenuItem }
}

export const SingleOrderItem = ({ item }: Props) => {
  const language = useContext(LanguageContext)
  
  return ( 
    <div className='p-4 border rounded-xl shadow-sm'>
      <Image className='mx-auto' alt='Sandwich' src='/sandwich.png' width={150} height={150} />
      <DisplaySandwichTitle 
        en={item.item.enName}
        ar={item.item.arName}
        enClass='text-sm'
        arClass='text-sm'
      />
      <Separator className='my-2' />
      <ul className='space-y-2'>
        <li className='flex items-center justify-between text-sm'>
          <span className='font-medium'>{translate('quantity', language)}</span>
          <span className="text-secondaryMain">x{item.quantity}</span>
        </li>
        <li className='flex items-center justify-between text-sm'>
          <span className='font-medium'>{translate('unitPrice', language)}</span>
          <span className='text-green-700 font-semibold'>{item.unitPrice} {translate('le', language)}</span>
        </li>
        <li className='flex items-center justify-between text-sm'>
          <span className='font-medium'>{translate('totalPrice', language)}</span>
          <span className='text-green-700 font-semibold'>{item.totalPrice} {translate('le', language)}</span>
        </li>
      </ul>
    </div>
  );
}