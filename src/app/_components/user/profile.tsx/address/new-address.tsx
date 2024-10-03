"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { newAddressAction } from "@/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react";
import { LanguageContext } from "@/providers/language";
import { AddressSchema } from "@/schema";

import translate from "@/services/translate";

export const NewAddressModal = () => {

  const language = useContext(LanguageContext)
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(AddressSchema.create),
    defaultValues: {
      phoneNumber: '',
      streetName: '',
      notes: '',
      homeNumber: ''
    }
  })

  const newAddressMutation = useMutation({
    mutationFn: (values: z.infer<typeof AddressSchema.create>) => newAddressAction(values),
    onSuccess: (data) => {
      toast.message(data.message)
      form.reset()
      setOpen(false)
    }
  })

  const handleNewAddress = () => {
    newAddressMutation.mutate(form.getValues())
  }

  return ( 
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='flex gap-2 items-center bg-secondaryMain p-2 px-3 rounded-md text-sm hover:bg-secondaryMain/80'>
        <Plus className='size-4' />
        {translate('newAddress', language)}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translate('newAddress', language)}</DialogTitle>
        </DialogHeader>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleNewAddress)} className='space-y-4'>

            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("streetName", language)}</FormLabel>
                  <FormControl>
                    <Input placeholder={translate("streetName", language)} {...field} />
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
                      <Input placeholder="homeNumber" {...field} />
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
                      <Input type='text' placeholder={translate("phoneNumber", language)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("notes", language)}</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder={translate("notes", language)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <LoadingButton variant="secondaryMain" loading={newAddressMutation.isPending}>{translate("create", language)}</LoadingButton>

          </form>

        </Form>
          
      </DialogContent>
    </Dialog>
  );
}