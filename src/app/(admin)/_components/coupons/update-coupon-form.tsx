"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { CategorySchema, CouponSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { CustomInput } from "@/components/input";
import { ArrowDown, List, Percent } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Coupon } from "@prisma/client";

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/lib/routes";
import { updateCoupon } from "@/actions/coupons";
import { z } from "zod";

export const UpdateCouponForm = ({ coupon }: { coupon: Coupon }) => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(CouponSchema.update),
    defaultValues: {
      name: coupon.name,
      discount: coupon.discount,
      usages: coupon.usages,
      active: coupon.active,
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof CouponSchema.update> }) => updateCoupon(coupon.id, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(adminRoutes.coupons())
      }
    }
  })

  const handleUpdate = async () => {
    updateMutation.mutate({
      values: form.getValues()
    })
  }

  return ( 
    <div className="xl:w-[50%]">
      
      <Form {...form}>

        
      <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>

        <div className="grid xl:grid-cols-2 gap-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('coupon', language)}</FormLabel>
                <FormControl>
                  <CustomInput defaultValue={coupon.name} icon={Percent} placeholder={translate('coupon', language)} {...field} />
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
                  <CustomInput defaultValue={coupon.usages} icon={List} type='text' placeholder={translate('numberOfUsages', language)} {...form.register("usages", { valueAsNumber: true })} />
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
                  <CustomInput defaultValue={coupon.discount} icon={ArrowDown} type='text' placeholder={translate('discount', language)} {...form.register("discount", { valueAsNumber: true })} />
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
                  <Checkbox defaultChecked={coupon.active} checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{translate('isActive', language)}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton variant='secondaryMain' loading={updateMutation.isPending}>{translate('update', language)}</LoadingButton>

        </form>

      </Form>

    </div>
  );
}