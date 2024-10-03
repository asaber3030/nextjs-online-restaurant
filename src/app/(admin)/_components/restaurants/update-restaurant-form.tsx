"use client";

import translate from "@/services/translate";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { AdminSchema, RestaurantSchema } from "@/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { LanguageContext } from "@/providers/language";
import { CustomInput } from "@/components/input";
import { LinkIcon, Mail, Phone, PhoneIcon, UserIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/lib/routes";

import { updateRestaurant } from "@/actions/restaurants";

export const UpdateRestaurantForm = ({ restaurant }: { restaurant: Restaurant }) => {

  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(AdminSchema.update),
    defaultValues: {
      name: restaurant.name,
      location: restaurant.location,
      description: restaurant.description,
      phoneNumbers: restaurant.phoneNumbers,
      facebookUrl: restaurant.facebookUrl,
      instagramUrl: restaurant.instagramUrl,
      mainPhone: restaurant.mainPhone,
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof RestaurantSchema.update> }) => updateRestaurant(restaurant.id, values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(adminRoutes.restaurants())
      }
    }
  })

  const handleUpdate = async () => {
    updateMutation.mutate({
      values: form.getValues()
    })
  }

  return ( 
    <div className="mt-4">
      
      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <CustomInput icon={UserIcon} placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid xl:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="mainPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Phone</FormLabel>
                  <FormControl>
                    <CustomInput icon={PhoneIcon} type='text' placeholder="Main Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone numbers</FormLabel>
                  <FormControl>
                    <CustomInput icon={Phone} type='text' placeholder="Phone numbers" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Separete with ","</FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className="grid xl:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Url</FormLabel>
                  <FormControl>
                    <CustomInput icon={LinkIcon} type='text' placeholder="Facebook Url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Url</FormLabel>
                  <FormControl>
                    <CustomInput icon={LinkIcon} type='text' placeholder="Instagram Url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field}></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton variant='secondaryMain' loading={updateMutation.isPending}>Update</LoadingButton>

        </form>

      </Form>

    </div>
  );
}