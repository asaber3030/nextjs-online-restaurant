"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { AdminSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { z } from "zod";
import { CustomInput } from "@/components/input";
import { Mail, Phone, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/lib/routes";

import { User } from "@prisma/client";
import { updateUser } from "@/actions/user";

export const UpdateUserForm = ({ user }: { user: User }) => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(AdminSchema.update),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phoneNumber
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof AdminSchema.update> }) => updateUser(user.id, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(adminRoutes.users())
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
                    <CustomInput icon={UserIcon} placeholder={translate('name', language)} {...field} />
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
                <FormLabel>{translate('phone', language)}</FormLabel>
                <FormControl>
                  <CustomInput icon={Phone} type='text' placeholder={translate('phone', language)} {...field} />
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