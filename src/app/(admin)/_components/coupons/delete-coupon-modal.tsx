"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteCoupon } from "@/actions/coupons"
import { useContext } from "react"
import { LanguageContext } from "@/providers/language"
import translate from "@/services/translate"

type Props = { 
  couponId: number,
  children: React.ReactNode
}

export const DeleteCouponModal = ({ couponId, children }: Props) => {
  
  const language = useContext(LanguageContext)
  const deleteMutation = useMutation({
    mutationFn: () => deleteCoupon(couponId),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  return ( 
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{translate('areYouSureTitle', language)}</AlertDialogTitle>
          <AlertDialogDescription>
            {translate('areYouSureDescription', language)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translate('cancel', language)}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>{translate('submit', language)}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}