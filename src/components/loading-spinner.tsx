import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"

export const LoadingSpinner = ({ parentClassName }: { parentClassName?: string }) => {
  return ( 
    <div className={cn('flex gap-2 items-center', parentClassName)}>
      <Loader2 className="animate-spin size-4" />
      <p className='text-gray-500'>Loading...</p>
    </div>
  );
}