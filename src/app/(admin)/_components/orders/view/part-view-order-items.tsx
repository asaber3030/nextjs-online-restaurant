"use client";

import Image from "next/image";

import { FullOrderItem } from "@/types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";
import { MenuItemCard } from "@/app/_components/app/menu-item/menu-item-card";

type Props = {
  items: FullOrderItem[]
}

export const PartOrderItems = ({ items }: Props) => {
  const language = useContext(LanguageContext)
  return ( 
    <div>
      <h3 className="font-bold text-2xl mb-2">{translate('orderItems', language)}</h3>
      <Table className="shadow-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] hidden md:table-cell">{translate('image', language)}</TableHead>
            <TableHead className="max-w-[150px]">{translate('name', language)}</TableHead>
            <TableHead>{translate('quantity', language)}</TableHead>
            <TableHead>{translate('total', language)}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell className="hidden md:table-cell">
                <Image
                  src={item.item.image}
                  width={40}
                  height={40}
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.item.enName}</TableCell>
              <TableCell>x{item.quantity}</TableCell>
              <TableCell className="text-green-700">{item.totalPrice} {translate('le', language)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}