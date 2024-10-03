"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { CategorySchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { CustomInput } from "@/components/input";
import { Text } from "lucide-react";
import { Category } from "@prisma/client";

import { updateCategory } from "@/actions/categories";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/lib/routes";

export const UpdateCategoryForm = ({ category }: { category: Category }) => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(CategorySchema.update),
    defaultValues: {
      enName: category.enName,
      arName: category.arName,
      color: category.color
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof CategorySchema.update> }) => updateCategory(category.id, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(adminRoutes.categories())
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
              name="enName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('englishName', language)}</FormLabel>
                  <FormControl>
                    <CustomInput defaultValue={category.enName} icon={Text} placeholder="English name" {...field} />
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
                    <CustomInput defaultValue={category.enName} icon={Text} type='text' placeholder="Arabic" {...field} />
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
                  <CustomInput defaultValue={category.enName} icon={Text} type='color' placeholder="Arabic" {...field} />
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