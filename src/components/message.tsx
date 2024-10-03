import { toast } from "sonner"

export const message = (msg: string, status: number) => {
  if (status === 200 || status === 201) {
    toast.success(msg)
    return
  }
  toast.error(msg)
}