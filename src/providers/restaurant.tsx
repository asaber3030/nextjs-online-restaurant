'use client'

import { Restaurant } from "@prisma/client"
import React, { createContext } from "react"

export const ResturantContext = createContext<{
  current: Restaurant | undefined | null,
  resturants: Restaurant[]
}>({
  current: undefined,
  resturants: []
})

type ResturantProviderProps = {
  current:  Restaurant | undefined | null,
  resturants: Restaurant[],
  children: React.ReactNode
}

export default function ResturantProvider({ children, resturants, current }: ResturantProviderProps) {
  return (
    <ResturantContext.Provider value={{ resturants, current }}>
      {children}
    </ResturantContext.Provider>
  )
}