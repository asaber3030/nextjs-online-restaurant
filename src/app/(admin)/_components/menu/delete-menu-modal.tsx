"use client"

import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { LanguageContext } from "@/providers/language"

import { toast } from "sonner"
import { deleteMenuItem } from "@/actions/menu"

import translate from "@/services/translate"

type Props = { 
  itemId: number,
  children: React.ReactNode
}

export const DeleteMenuItemModal = ({ itemId, children }: Props) => {
  
  const language = useContext(LanguageContext)
  const deleteMutation = useMutation({
    mutationFn: () => deleteMenuItem(itemId),
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