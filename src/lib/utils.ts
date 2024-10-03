import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

import { OrderStatus } from "@prisma/client"
import { SearchParams } from "@/types"

import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateArray(length: number) {
  return Array.from({ length })
}

export function extractToken(headers: string) {
  return headers.split(" ")[1]
}

export function extractErrors(errors: ZodError) {
  return errors.flatten().fieldErrors
}

export function randomHexColorCode() {
  let colors = ["bg-red-500", "bg-blue-500", "bg-teal-500", "bg-green-500", "bg-yellow-500", "bg-gray", "bg-orange-500"]
  return colors[Math.floor(Math.random() * 6)]
}

export function diffForHuman(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = "lll") {
  return moment(date).format(format)
}

export function orderStatusBadge(status: OrderStatus) {
  switch (status) {
    case OrderStatus.JustOrdered:
      return "default"
    case OrderStatus.Reviewed:
      return "main"
    case OrderStatus.BeingCooked:
      return "primary"
    case OrderStatus.OutForDelivery:
      return "secondaryMain"
    case OrderStatus.Delivered:
      return "success"
  }
}

export function orderStatusLabel(status: OrderStatus) {
  switch (status) {
    case OrderStatus.JustOrdered:
      return "Just Ordered"
    case OrderStatus.Reviewed:
      return "Reviewed"
    case OrderStatus.BeingCooked:
      return "Being Cooked"
    case OrderStatus.OutForDelivery:
      return "Out For Delivery"
    case OrderStatus.Delivered:
      return "Delivered"
  }
}

export function createPagination(items: SearchParams, skipLimit: boolean = false) {
  const page = Number(items.page)
  const take = items.take ? +items.take : 10
  const orderBy = items.orderBy ?? "id"
  const orderType = items.orderType ?? "desc"

  let skip = (page - 1) * (skipLimit ? 0 : take)

  return {
    orderBy: orderBy as string,
    orderType: orderType as string,
    skip,
    take,
    page,
  }
}

export function formatNumber(num: number) {
  return (Math.round(num * 100) / 100).toFixed(2)
}
