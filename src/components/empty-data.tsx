import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { PackageOpen } from "lucide-react";

type Props = {
  label?: string,
  className?: string,
  title?: string,
  children?: React.ReactNode
}
export const EmptyData = ({ children, className, title = 'No Data Found', label = 'No Data Found' }: Props) => {
  return ( 
    <Alert className={cn(className, 'bg-secondary shadow-sm items-center')}>
      <PackageOpen className="size-6" />
      <AlertTitle className='ml-4 font-medium'>{title}</AlertTitle>
      {children && (
        <section className='mt-2 ml-4'>
          {children}
        </section>
      )}
    </Alert>
  );
}