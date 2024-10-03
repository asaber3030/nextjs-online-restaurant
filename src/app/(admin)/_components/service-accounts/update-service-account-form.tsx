"use client";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { ServiceAccountSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from "@/components/input";
import { Mail, Phone, User } from "lucide-react";
import { adminRoutes } from "@/lib/routes";
import { updateServiceAccount } from "@/actions/service-accounts";
import { Restaurant, ServiceAccount } from "@prisma/client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import translate from "@/services/translate";

export const UpdateServiceAccountForm = ({ restaurants, account }: { account: ServiceAccount, restaurants: Restaurant[] }) => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(ServiceAccountSchema.update),
    defaultValues: {
      name: account.name,
      email: account.email,
      password: account.password,
      phone: account.phoneNumber,
      resturantId: account.resturantId,
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof ServiceAccountSchema.update> }) => updateServiceAccount(account.id, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(adminRoutes.serviceAccounts())
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
                  <FormLabel>{translate('name', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={User} placeholder={translate('name', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('email', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Mail} type='text' placeholder={translate('email', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('phoneNumber', language)}</FormLabel>
                <FormControl>
                  <CustomInput icon={Phone} type='text' placeholder={translate('phoneNumber', language)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resturantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('restaurant', language)}</FormLabel>
                <FormControl>
                  <Select onValueChange={(value: string) => field.onChange(+value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={translate('restaurant', language)} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {restaurants?.map(res => <SelectItem key={res.id} value={String(res.id)}>{res.name}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
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