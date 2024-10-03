"use server";

import { RestaurantSchema } from "@/schema";

import { actionResponse, responseCodes } from "@/lib/response";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/routes";
import { z } from "zod";

import db from "@/services/prisma";
import { createPagination } from "@/lib/utils";

import { SearchParams } from "@/types";

// For Admin
export async function getMainRestaurants() {
  const res = await db.restaurant.findMany()
  return res
}

export async function getRestaurantById(id: number) {
  return await db.restaurant.findUnique({
    where: { id }
  })
}

export async function createRestaurant(values: z.infer<typeof RestaurantSchema.create>) {
  const exists = await db.restaurant.findFirst({ where: { name: values.name } })
  if (exists) return actionResponse(responseCodes.badRequest, "Restaurant already exists.")

  await db.restaurant.create({
    data: { ...values, logo: '/main-logo.svg' }
  })

  revalidatePath(adminRoutes.restaurants())
  return actionResponse(responseCodes.created, "Restaurant has been created.")
}

export async function updateRestaurant(id: number, values: z.infer<typeof RestaurantSchema.update>) {
  
  const exists = await db.restaurant.findFirst({ 
    where: { 
      name: values.name,
      AND: [ { id: { not: id } } ]
    }
  })
  if (exists) return actionResponse(responseCodes.badRequest, "Restaurants already exists.")

  const restaurant = await db.restaurant.findUnique({ where: { id } })
  if (!restaurant) return actionResponse(responseCodes.badRequest, "No Restaurant found.")

  await db.restaurant.update({
    where: { id },
    data: values
  })

  revalidatePath(adminRoutes.restaurants())

  return actionResponse(responseCodes.ok, "Restaurant has been updated.")
}

export async function deleteRestaurant(id: number) {
  const restaurant = await db.restaurant.findUnique({ where: { id } })
  if (!restaurant) return actionResponse(responseCodes.badRequest, "No restaurant found.")

  await db.restaurant.delete({
    where: { id },
  })

  revalidatePath(adminRoutes.restaurants())

  return actionResponse(responseCodes.ok, "Restaurant has been deleted.")
}

export async function getCategoriesByRes(resId: number) {
  return await db.category.findMany({
    where: { restaurantId: resId },
    include: { 
      items: true,
      _count: { select: { items: true } }
    }
  })
}

export async function getMenuByRes(resId: number, params: SearchParams) {
  
  const { skip, take } = createPagination(params)

  return await db.menuItem.findMany({
    where: { category: { restaurantId: resId } },
    include: { category: true },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })
}

export async function getOffersByRes(resId: number) {
  return await db.offer.findMany({
    where: { resturantId: resId },
    include: {
      offerItems: { include: { item: true } }
    }
  })
}

export async function getOrdersByRes(resId: number, params: SearchParams) {
  return await db.order.findMany({
    where: { restaurantId: resId },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    include: {
      address: true,
      coupon: true,
      user: true,
      _count: { select: { items: true, } },
      items: {
        include: { item: true }
      }
    }
  })
}