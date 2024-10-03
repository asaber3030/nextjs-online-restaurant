"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { CategorySchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { Text } from "lucide-react";
import { CustomInput } from "@/components/input";

import { adminRoutes } from "@/lib/routes";
import { createCategory } from "@/actions/categories";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { z } from "zod";

export const CreateCategoryForm = () => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(CategorySchema.create),
    defaultValues: {
      enName: '',
      arName: '',
      color: '',
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof CategorySchema.create> }) => createCategory(values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 201) {
        router.push(adminRoutes.categories())
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
              name="enName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('englishName', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Text} placeholder={translate('englishName', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('arabicName', language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Text} type='text' placeholder={translate('arabicName', language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('color', language)}</FormLabel>
                <FormControl>
                  <CustomInput icon={Text} type='color' placeholder={translate('arabicName', language)} {...field} />
                </FormControl>
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