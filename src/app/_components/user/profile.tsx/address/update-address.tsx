"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { updateAddressAction } from "@/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input"
import { LanguageContext } from "@/providers/language";
import { AddressSchema } from "@/schema";
import { Address } from "@prisma/client";

import translate from "@/services/translate";

export const UpdateAddressModal = ({ address }: { address: Address }) => {

  const language = useContext(LanguageContext)
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(AddressSchema.update),
    defaultValues: {
      phoneNumber: address.phoneNumber,
      streetName: address.streetName,
      notes: address.notes,
      homeNumber: address.homeNumber,
    }
  })

  const updateAddressMutation = useMutation({
    mutationFn: (values: z.infer<typeof AddressSchema.update>) => updateAddressAction(address.id, values),
    onSuccess: (data) => {
      toast.message(data.message)
      setOpen(false)
    }
  })

  const handleUpdateAddress = () => {
    updateAddressMutation.mutate(form.getValues() as z.infer<typeof AddressSchema.update>)
  }

  return ( 
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger className='flex gap-2 items-center bg-white p-2 px-3 rounded-md text-sm hover:bg-gray-50 border'>
        {translate('update', language)}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translate('updateAddress', language)}</DialogTitle>
        </DialogHeader>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleUpdateAddress)} className='space-y-4'>

            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("streetName", language)}</FormLabel>
                  <FormControl>
                    <Input maxLength={50} defaultValue={address.streetName} placeholder={translate("streetName", language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="xl:grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="homeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("homeNumber", language)}</FormLabel>
                    <FormControl>
                      <Input maxLength={50} defaultValue={address.homeNumber} placeholder="homeNumber" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("phoneNumber", language)}</FormLabel>
                    <FormControl>
                      <Input maxLength={50} defaultValue={address.phoneNumber} type='text' placeholder={translate("phoneNumber", language)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <LoadingButton variant="secondaryMain" loading={updateAddressMutation.isPending}>{translate("update", language)}</LoadingButton>

          </form>

        </Form>
          
      </DialogContent>

    </Dialog>
  );
}