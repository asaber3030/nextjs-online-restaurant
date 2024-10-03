"use client"

import Link from "next/link";

import { routes } from "@/lib/routes";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navigation, ShoppingCart, User } from "lucide-react";
import translate from "@/services/translate";
import { useContext } from "react";
import { LanguageContext } from "@/providers/language";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "../../user/auth/logout";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";

type Props = { name: string, className?: ClassValue }

export const UserDropdown = ({ name, className }: Props) => {

  const language = useContext(LanguageContext)

  return ( 
    <li>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn(className)}>
            <User className="size-4" />
            {name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[250px]">
          <DropdownMenuLabel>{translate('myAccount', language)}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link className='flex gap-2 h-full w-full' href={routes.profile()}><User className="size-4 text-gray-500" /> {translate('profile', language)}</Link></DropdownMenuItem>
          <DropdownMenuItem><Link className='flex gap-2 h-full w-full' href={routes.profile('orders')}><ShoppingCart className="size-4 text-gray-500" /> {translate('orders', language)}</Link></DropdownMenuItem>
          <DropdownMenuItem><Link className='flex gap-2 h-full w-full' href={routes.profile('addresses')}><Navigation className="size-4 text-gray-500" /> {translate('addresses', language)}</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><LogoutButton /></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}