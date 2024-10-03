import { cn } from "@/lib/utils";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";
import { Loader } from "lucide-react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const LoadingButton = ({ loading, variant, size, className, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} className={cn(buttonVariants({ variant, size, className }))} disabled={loading}>
      {loading && <Loader className='animate-spin size-4' />}
      {props.children}
    </Button>
  )
}