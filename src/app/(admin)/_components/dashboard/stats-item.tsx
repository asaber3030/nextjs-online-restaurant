import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon,
  label: string,
  num: number,
  bgColor?: string,
  textColor?: string
}

export const StatsItem = ({ bgColor, textColor, icon: Icon, label, num }: Props) => {
  return ( 
    <div className="p-4 bg-white rounded-md shadow-sm flex gap-4 items-center">
      <div className={cn("size-12 bg-blue-100 text-blue-800 rounded-full flex justify-center items-center", textColor, bgColor)}><Icon className='size-6' /></div>
      <div>
        <h4 className="text-sm text-gray-500">{label}</h4>
        <p className='text-lg font-medium'>{num}</p>
      </div>
    </div>
  );
}