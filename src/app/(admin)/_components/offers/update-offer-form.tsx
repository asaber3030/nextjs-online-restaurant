"use client";

import translate from "@/services/translate";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { toast } from "sonner";
import { adminRoutes } from "@/lib/routes";
import { updateOffer } from "@/actions/offers";

import { OfferSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { CustomInput } from "@/components/input";
import { Book, DollarSign, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FullOffer } from "@/types";
import { CreateOfferItem } from "./create-offer-item";
import { UpdateOfferItem } from "./update-offer-item";
import { EmptyState } from "@/components/empty-state";

export const UpdateOfferForm = ({ offer }: { offer: FullOffer }) => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(OfferSchema.update),
    defaultValues: {
      enTitle: offer.enTitle ?? '',
      arTitle: offer.arTitle ?? '',
      arDescription: offer.arDescription ?? '',
      enDescription: offer.enDescription ?? '',
      offerPrice: offer.offerPrice ?? 0,
      price: offer.price ?? 0,
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof OfferSchema.update> }) => updateOffer(offer.id, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(adminRoutes.updateOffer(offer.id))
      }
    }
  })

  const handleUpdate = async () => {
    updateMutation.mutate({
      values: form.getValues()
    })
  }

  return ( 
    <div>
      
      <Form {...form}>
        
        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
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
          
          <LoadingButton variant='secondaryMain' loading={updateMutation.isPending}>{translate('update', language)}</LoadingButton>

        </form>

      </Form>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{translate('createOfferItem', language)}</h3>
        <CreateOfferItem offer={offer} />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{translate('offerItems', language)}</h3>
        {offer.offerItems.length === 0 && <EmptyState title={translate('noData', language)} className="bg-white" />}
        {offer.offerItems.map((item) => (
          <UpdateOfferItem item={item} />
        ))}
      </div>

    </div>
  );
}