"use client"

import translate from "@/services/translate"

import { useForm } from "react-hook-form"
import { useContext } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { AdminSchema } from "@/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button"
import { LanguageContext } from "@/providers/language"

import { loginAdminAction } from "@/actions/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { cairoFont } from "@/lib/fonts"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"
import { z } from "zod"

export const LoginAdminForm = () => {
  const language = useContext(LanguageContext)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(AdminSchema.login),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const loginMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof AdminSchema.login> }) => loginAdminAction(values),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 200) {
        router.push(routes.adminDashboard())
      }
    },
  })

  const handleRegister = async () => {
    loginMutation.mutate({
      values: form.getValues(),
    })
  }

  return (
    <div className="xl:w-[50%] border bg-white shadow-md p-6 rounded-md mx-auto">
      <header className="text-center mb-10">
        <h1 className={cn("text-4xl font-extrabold", language === "ar" && cairoFont.className)}>{translate("welcome", language)}</h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("email", language)}</FormLabel>
                <FormControl>
                  <Input placeholder="ex@domain.com" {...field} />
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
                <FormLabel>{translate("password", language)}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={translate("password", language)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton className="w-full" variant="secondaryMain" loading={loginMutation.isPending}>
            {translate("login", language)}
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}
