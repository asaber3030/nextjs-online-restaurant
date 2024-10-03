import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children?: React.ReactNode
  title: string
  className?: string
}
export const AdminTitle = ({ className, title, children }: Props) => {
  return ( 
    <header className={cn("flex justify-between items-center", className)}>
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex gap-2">{children}</div>
    </header>
  );
}