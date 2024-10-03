"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useUser } from "@/hooks";

import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserAction } from "@/actions/user";
import { z } from "zod";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputSkeleton } from "@/components/skeleton";
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { UserSchema } from "@/schema";

import translate from "@/services/translate";

export const UpdateUserInformation = () => {

  const { user, userLoading, userFetching, userRefetching } = useUser()
  
  const language = useContext(LanguageContext)
  const form = useForm({
    resolver: zodResolver(UserSchema.update),
    defaultValues: {
      name: user?.name,
      phone: user?.phoneNumber,
      email: user?.email,
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof UserSchema.update> }) => updateUserAction(values),
    onSuccess: (data) => {
      toast.message(data.message)
    },
    onError:(err) => {
      console.log({err: err.message})
    }
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      values: form.getValues()
    })
  }

  if (userLoading || userFetching || userRefetching) {
    return (
      <InputSkeleton />
    )
  }

  return ( 
    <div>

      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("name", language)}</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.name} placeholder={translate("namePlaceholder", language)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("phone", language)}</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.phoneNumber} placeholder="011xxxxxxx" {...field} />
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
                <FormLabel>{translate("email", language)}</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.email} type='email' placeholder={translate("email", language)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton variant="secondaryMain" loading={updateMutation.isPending}>{translate("update", language)}</LoadingButton>

        </form>

      </Form>

    </div>
  );
}