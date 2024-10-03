"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { OfferSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { CustomInput } from "@/components/input";
import { ArrowDown, Book, DollarSign, List, Percent } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { createCoupon } from "@/actions/coupons";
import { adminRoutes } from "@/lib/routes";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { z } from "zod";
import { createOffer } from "@/actions/offers";

export const CreateOfferForm = () => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(OfferSchema.create),
    defaultValues: {
      enTitle: '',
      arTitle: '',
      arDescription: '',
      enDescription: '',
      offerPrice: 0,
      price: 0
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof OfferSchema.create> }) => createOffer(values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 201) {
        if (data?.data?.id) {
          router.push(adminRoutes.updateOffer(data.data.id))
        } else {
          router.push(adminRoutes.offers())
        }
      }
    }
  })

  const handleCreate = async () => {
    createMutation.mutate({
      values: form.getValues()
    })
  }

  return ( 
    <div>
      
      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>

          <div className="grid xl:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="enTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('englishTitle', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Book} placeholder={translate('englishTitle', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('arabicTitle', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Book} type='text' placeholder={translate('arabicTitle', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid xl:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="enDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('englishDescription', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={List} placeholder={translate('englishDescription', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('arabicDescription', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={List} type='text' placeholder={translate('arabicDescription', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid xl:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="offerPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('oldPrice', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={DollarSign} type='text' placeholder={translate('oldPrice', language)} {...form.register("offerPrice", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('price', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={DollarSign} type='text' placeholder={translate('price', language)} {...form.register("price", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <LoadingButton variant='secondaryMain' loading={createMutation.isPending}>{translate('create', language)}</LoadingButton>

        </form>

      </Form>

    </div>
  );
}