"use client";

import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { deleteAddressAction } from "@/actions/user";
import { toast } from "sonner";
import { z } from "zod";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LanguageContext } from "@/providers/language";
import { Address } from "@prisma/client";

import translate from "@/services/translate";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";

export const DeleteAddressModal = ({ address }: { address: Address }) => {

  const language = useContext(LanguageContext)
  const [open, setOpen] = useState(false)

  const deleteAddressMutation = useMutation({
    mutationFn: () => deleteAddressAction(address.id),
    onSuccess: (data) => {
      toast.message(data.message)
      setOpen(false)
    }
  })

  const handleDeleteAddress = () => {
    deleteAddressMutation.mutate()
  }

  return ( 
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger className='flex gap-2 items-center bg-white p-2 px-3 rounded-md text-sm hover:bg-gray-50 border'>
        {translate('delete', language)}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translate('deleteAddress', language)}</DialogTitle>
          <DialogDescription>{translate('deleteAddressParagraph', language)}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='outline'>{translate("close", language)}</Button>
          <LoadingButton variant='secondaryMain' loading={deleteAddressMutation.isPending} onClick={handleDeleteAddress}>{translate("submit", language)}</LoadingButton>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}