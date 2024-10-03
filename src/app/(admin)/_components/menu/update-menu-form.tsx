"use client";

import { useForm } from "react-hook-form";
import { ChangeEvent, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { MenuItemSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { CustomInput } from "@/components/input";
import { List, Percent } from "lucide-react";

import {  updateMenuItem } from "@/actions/menu";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/lib/routes";
import { z } from "zod";
import { useCategories } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MenuItem } from "@prisma/client";
import translate from "@/services/translate";
import { LanguageContext } from "@/providers/language";

export const UpdateMenuItemForm = ({ item }: { item: MenuItem }) => {

  const router = useRouter()
  const language = useContext(LanguageContext)

  const [file, setFile] = useState<File | undefined>(undefined)

  const form = useForm({
    resolver: zodResolver(MenuItemSchema.create),
    defaultValues: {
      enName: item.enName,
      arName: item.arName,
      offerPrice: item.offerPrice,
      price: item.price,
      ingredients: item.ingredients,
      categoryId: item.categoryId,
    }
  })

  const { categories, categoriesLoading } = useCategories()

  const updateMutation = useMutation({
    mutationFn: ({ formData, values, haveFile }: { haveFile: boolean, formData: FormData, values: z.infer<typeof MenuItemSchema.create> }) => updateMenuItem(item.id, formData, haveFile, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(adminRoutes.menuItems())
      }
    }
  })

  const handleUpdate = async () => {
    const formData = new FormData()
    if (file) {
      formData.append('file', file as any)
    }
    updateMutation.mutate({
      formData,
      haveFile: !!formData.get('file'),
      //@ts-ignore
      values: form.getValues() 
    })
  }


  return ( 
    <div className="xl:w-[50%]">
      
      <Form {...form}>
        
        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>

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
                    <CustomInput defaultValue={String(item.enName)} icon={Percent} placeholder={translate("englishName", language)} {...field} />
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
                    <CustomInput defaultValue={String(item.arName)} icon={Percent} placeholder={translate("arabicName", language)} {...field} />
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
                    <CustomInput defaultValue={String(item.offerPrice)} icon={List} type='text' placeholder={translate("oldPrice", language)} {...form.register("offerPrice", { valueAsNumber: true })} />
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
                    <CustomInput defaultValue={String(item.price)} icon={List} type='text' placeholder={translate("price", language)} {...form.register("price", { valueAsNumber: true })} />
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
                    <Select defaultValue={String(item.categoryId)} onValueChange={(value: string) => form.setValue('categoryId', +value)} {...form.register('categoryId', { valueAsNumber: true })}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.enName} - {cat._count.items} items</SelectItem>)}
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
                  <CustomInput defaultValue={String(item.ingredients)} icon={Percent} placeholder={translate("ingredients", language)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton variant='secondaryMain' loading={updateMutation.isPending}>{translate("update", language)}</LoadingButton>

        </form>

      </Form>

    </div>
  );
}