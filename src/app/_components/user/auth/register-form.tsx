"use client";

import Link from "next/link";
import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import { registerAction } from "@/actions/auth";
import { responseCodes } from "@/lib/response";
import { zodResolver } from '@hookform/resolvers/zod'
import { routes } from "@/lib/routes";
import { toast } from 'sonner'
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LanguageContext } from "@/providers/language";
import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo";
import { UserSchema } from "@/schema";

export const RegisterForm = () => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(UserSchema.register),
    defaultValues: {
      name: '',
      password: '',
      phone: '',
      email: ''
    }
  })

  const registerMutation = useMutation({
    mutationFn: (values: z.infer<typeof UserSchema.register>) => registerAction(values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === responseCodes.created) {
        form.reset()
        router.push(routes.login())
      }
    }
  })

  const handleRegister = () => {
    registerMutation.mutate(form.getValues())
  }

  return ( 
    <div className='xl:w-[50%] border bg-white shadow-md p-6 rounded-md mx-auto'>

      <header className='text-center mb-10'>
        <Logo showAppName={false} width={90} height={90} parentClassName='mx-auto justify-center mb-4' />
        <h1 className="text-4xl font-extrabold">{translate('registerTitle', language)}</h1>
        <p className='text-gray-500 text-xl mt-3'>{translate('registerDescription', language)}</p>
      </header>

      <Form {...form}>
       
       <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4'>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('name', language)}</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Amazon" {...field} />
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
                  <Input placeholder="example@domain.com" {...field} />
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
                <FormLabel>{translate('phoneNumber', language)}</FormLabel>
                <FormControl>
                  <Input placeholder="01xxxxxxx" {...field} />
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
          
          <LoadingButton className="w-full" variant='secondaryMain' loading={registerMutation.isPending}>{translate('register', language)}</LoadingButton>
          <Link href={routes.login()} className="hover:underline text-secondaryMain text-sm block mx-auto text-center">{translate('alreadyHaveAccount', language)}</Link>

        </form>

      </Form>

    </div>
  );
}