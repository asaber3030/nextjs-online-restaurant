"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteUser } from "@/actions/user"
import { useContext } from "react"
import { LanguageContext } from "@/providers/language"
import translate from "@/services/translate"

type Props = { 
  userId: number,
  children: React.ReactNode
}

export const DeleteUserModal = ({ userId, children }: Props) => {
  
  const language = useContext(LanguageContext)
  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(userId),
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