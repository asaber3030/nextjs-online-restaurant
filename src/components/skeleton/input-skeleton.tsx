import { cn, generateArray } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton";
import { ClassValue } from "clsx";
import { Fragment } from "react";

type Props = {
  repeat?: number,
  idx?: string
  parentClassName?: ClassValue
}

export const InputSkeleton = ({ parentClassName, idx, repeat = 3 }: Props) => {
  return ( 

    <div className={cn(parentClassName, 'flex flex-col gap-4')}>
      {generateArray(repeat).map((item, idx) => (
        <Fragment key={`${idx ?? 'idx-' + item}`}>
          <Skeleton className="w-[100px] h-4 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
        </Fragment>
      ))}
    </div>
  );
}