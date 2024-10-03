"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";


import { CouponSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { z } from "zod";
import { CustomInput } from "@/components/input";
import { ArrowDown, List, Percent, ShieldQuestion, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/lib/routes";
import { createCoupon } from "@/actions/coupons";
import { Checkbox } from "@/components/ui/checkbox";

export const CreateCouponForm = () => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(CouponSchema.create),
    defaultValues: {
      name: '',
      discount: 0,
      usages: 0,
      active: true
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof CouponSchema.create> }) => createCoupon(values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 201) {
        router.push(adminRoutes.coupons())
      }
    }
  })

  const handleCreate = async () => {
    createMutation.mutate({
      values: form.getValues()
    })
  }

  return ( 
    <div className="xl:w-[50%]">
      
      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>

          <div className="grid xl:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('code', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Percent} placeholder={translate('code', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="usages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('numberOfUsages', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={List} type='text' placeholder={translate('numberOfUsages', language)} {...form.register("usages", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('discount', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={ArrowDown} type='text' placeholder={translate('discount', language)} {...form.register("discount", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 items-center">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>{translate('isActive', language)}</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton variant='secondaryMain' loading={createMutation.isPending}>{translate('create', language)}</LoadingButton>

        </form>

      </Form>

    </div>
  );
}