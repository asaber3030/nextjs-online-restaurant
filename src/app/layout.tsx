import "./globals.css"

import { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"
import { AvailableLanguages } from "@/types"
import { Analytics } from "@vercel/analytics/react"

import { cookies } from "next/headers"
import { cookieLangName, cookieResturantName } from "@/lib/constants"
import { cairoFont, interFont } from "@/lib/fonts"

import db from "@/services/prisma"

import StoreProvider from "@/providers/redux"
import ResturantProvider from "@/providers/restaurant"
import LanguageProvider from "@/providers/language"
import ReactQueryClientProvider from "@/providers/react-query"

export const metadata: Metadata = {
  title: "مطعم ابقى قابلني",
  description: "ASABER3030",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const language = (cookieStore.get(cookieLangName)?.value as AvailableLanguages) ?? "ar"

  const currentResturantId = cookieStore.get(cookieResturantName)?.value ? Number(cookieStore.get(cookieResturantName)?.value) : 1
  const initialResturant = (await db.restaurant.findUnique({ where: { id: currentResturantId } })) ?? (await db.restaurant.findUnique({ where: { id: 1 } }))
  const resturants = await db.restaurant.findMany()

  return (
    <ReactQueryClientProvider>
      <html lang={language} dir={language == "en" ? "ltr" : "rtl"}>
        <body style={{ direction: language == "en" ? "ltr" : "rtl" }} className={language == "en" ? interFont.className : cairoFont.className}>
          <LanguageProvider language={language}>
            <StoreProvider>
              <ResturantProvider current={initialResturant} resturants={resturants}>
                {children}
                <Analytics />
                <Toaster position="top-center" />
              </ResturantProvider>
            </StoreProvider>
          </LanguageProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
