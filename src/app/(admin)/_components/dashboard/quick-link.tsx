import { LucideIcon, Plus } from "lucide-react";

import Link from "next/link";

type Props = {
  icon?: LucideIcon,
  label: string,
  url: string,
}

export const QuickLink = ({ icon: Icon = Plus, label, url }: Props) => {

  return ( 
    <Link href={url} className="p-2 bg-white rounded-md transition-all border border-transparent hover:border-secondaryMain shadow-sm flex gap-4 items-center">
      <div className={"size-8 bg-gray-100 text-gray-800 rounded-md flex justify-center items-center"}><Icon className='size-4' /></div>
      <div className="text-sm font-medium text-gray-500">
        {label}
      </div>
    </Link>
  );
}