"use client";

import Link from "next/link";
import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from '@hookform/resolvers/zod'

import { UserSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";

import { loginAction } from "@/actions/auth";
import { routes } from "@/lib/routes";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm = () => {

  const language = useContext(LanguageContext)
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm({
    resolver: zodResolver(UserSchema.login),
    defaultValues: {
      phone: '',
      password: '',
      rememberMe: false
    }
  })

  const loginMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof UserSchema.login> }) => loginAction(values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(searchParams.get('callback') ? '/' + searchParams.get('callback') : routes.menu())
      }
    }
  })

  const handleRegister = async () => {
    loginMutation.mutate({
      values: form.getValues()
    })
  }

  return ( 
    <div className='xl:w-[50%] border bg-white shadow-md p-6 rounded-md mx-auto'>
      <header className='text-center mb-10'>
        <h1 className="text-4xl font-extrabold">{translate('welcome', language)}</h1>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4'>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('phoneNumber', language)}</FormLabel>
                <FormControl>
                  <Input placeholder="011xxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('password', language)}</FormLabel>
                <FormControl>
                  <Input type='password' placeholder={translate('password', language)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  className="ml-2"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 ml-2 mr-2 leading-none">
                <FormLabel>{translate('rememberMe', language)}</FormLabel>
              </div>
            </FormItem>
            )}
          />

          <LoadingButton className="w-full" variant='secondaryMain' loading={loginMutation.isPending}>{translate('login', language)}</LoadingButton>

          <Link href={routes.register()} className="hover:underline text-secondaryMain text-sm block mx-auto text-center">{translate('doesntHaveAccount', language)}</Link>

        </form> 

      </Form>
    </div>
  );
}