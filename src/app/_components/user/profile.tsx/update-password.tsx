"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserPasswordAction } from "@/actions/user";
import { toast } from "sonner";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { UserSchema } from "@/schema";

import translate from "@/services/translate";

export const UpdateUserPassword = () => {

  const language = useContext(LanguageContext)
  const form = useForm({
    resolver: zodResolver(UserSchema.changePassword),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmationPassword: ''
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof UserSchema.changePassword> }) => updateUserPasswordAction(values),
    onSuccess: (data) => {
      toast.message(data.message)
    },
    onError(err) {
      console.log(err)
    }
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      values: form.getValues()
    })
  }

  return ( 
    <div>

      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>

          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("currentPassword", language)}</FormLabel>
                <FormControl>
                  <Input type='password' placeholder={"**** ****"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid xl:grid-cols-2 gap-4 grid-cols-1">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("newPassword", language)}</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder={"**** ****"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="confirmationPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("confirmationPassword", language)}</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder={"**** ****"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <LoadingButton variant="secondaryMain" loading={updateMutation.isPending}>{translate("update", language)}</LoadingButton>

        </form>

      </Form>

    </div>
  );
}