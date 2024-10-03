'use client'

import { AvailableLanguages } from "@/types"
import React, { createContext } from "react"

export const LanguageContext = createContext<AvailableLanguages | undefined>('en')

type LanguageProviderProps = {
  language?: AvailableLanguages | undefined,
  children: React.ReactNode
}

export default function LanguageProvider({ children, language }: LanguageProviderProps) {
  return (
    <LanguageContext.Provider value={language ?? 'ar'}>
      {children}
    </LanguageContext.Provider>
  )
}