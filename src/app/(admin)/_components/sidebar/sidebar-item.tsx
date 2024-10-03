import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  icon: LucideIcon,
  label: string 
  url: string
}

export const SidebarItem = ({ icon: Icon, label, url }: Props) => {
  return ( 
    <li>
      <Link href={url} className="px-4 py-2 rounded-md mb-1 flex gap-4 items-cnter border border-transparent hover:border-border transition-all hover:bg-blue-50 font-medium text-sm">
        <Icon className='size-4 text-gray-500' /> {label}
      </Link>
    </li>
  );
}