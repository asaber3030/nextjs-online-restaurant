import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon
  }

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, type, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon className='size-4 absolute top-1/2 -translate-y-1/2 left-4 text-secondaryMain' />
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-opacity-45 px-3 pl-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#76828D] focus:border-secondaryMain focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

      </div>
    )
  }
)
CustomInput.displayName = "Input"

export { CustomInput }