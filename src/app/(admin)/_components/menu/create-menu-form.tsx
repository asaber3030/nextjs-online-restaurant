"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useCategories } from "@/hooks";

import { createMenuItem } from "@/actions/menu";
import { adminRoutes } from "@/lib/routes";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { z } from "zod";

import { MenuItemSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { CustomInput } from "@/components/input";
import { List, Percent } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const CreateMenuItemForm = () => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const [file, setFile] = useState<File | undefined>(undefined)

  const form = useForm({
    resolver: zodResolver(MenuItemSchema.create)
  })

  const { categories, categoriesLoading } = useCategories()

  const createMutation = useMutation({
    mutationFn: ({ formData, values }: { formData: FormData, values: z.infer<typeof MenuItemSchema.create> }) => createMenuItem(formData, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 201) {
        router.push(adminRoutes.menuItems())
      }
    },
    onError: (error) => {
      console.log({error})
    }
  })

  const handleCreate = async () => {

    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    } else {
      toast.message("Please upload a file!")
      return 
    }
    createMutation.mutate({
      formData,
      //@ts-ignore
      values: form.getValues() 
    })
  }


  return ( 
    <div className="xl:w-[50%]">
      
      <Form {...form}>
        
        <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>

          <div className="mt-4">
            <FormLabel>{translate("uploadSandwichFile", language)}</FormLabel>
            <Input type='file' onChange={(event: ChangeEvent<HTMLInputElement>) => setFile(event.target?.files?.[0])} />
          </div>

          <div className="grid xl:grid-cols-2 gap-4 mt-4">

            <FormField
              control={form.control}
              name="enName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("englishName", language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Percent} placeholder={translate("englishName", language)} {...field} />
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
                  <FormLabel>{translate("arabicName", language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={Percent} placeholder={translate("arabicName", language)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="grid xl:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="offerPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("oldPrice", language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={List} type='text' placeholder={translate("oldPrice", language)} {...form.register("offerPrice", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("price", language)}</FormLabel>
                  <FormControl>
                    <CustomInput icon={List} type='text' placeholder={translate("price", language)} {...form.register("price", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("category", language)}</FormLabel>
                  {categoriesLoading ? (
                    <Skeleton className="w-full h-10" />
                  ): (
                    <Select onValueChange={(value: string) => form.setValue('categoryId', +value)} {...form.register('categoryId', { valueAsNumber: true })}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.enName} - {cat._count.items} {translate("items", language)}</SelectItem>)}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("ingredients", language)}</FormLabel>
                <FormControl>
                  <CustomInput icon={Percent} placeholder={translate("ingredients", language)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton variant='secondaryMain' loading={createMutation.isPending}>{translate("create", language)}</LoadingButton>

        </form>

      </Form>

    </div>
  );
}