import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type Props = {
  title: string,
  children?: React.ReactNode,
  className?: ClassValue
}
export const ProfileTitle = ({ title, children, className }: Props) => {
  return ( 
    <header className="flex items-center justify-between border-b pb-2 mb-2">
      <h1 className={cn("font-bold text-2xl", className)}>
        {title}
      </h1>
      {children}
    </header>
  );
}