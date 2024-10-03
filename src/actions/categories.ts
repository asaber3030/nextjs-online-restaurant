"use server";

import db from "@/services/prisma";

import { SearchParams } from "@/types";
import { getCurrentResturant } from "./app";

import { createPagination } from "@/lib/utils";
import { z } from "zod";
import { CategorySchema } from "@/schema";
import { actionResponse, responseCodes } from "@/lib/response";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/routes";

export async function getCategories(params: SearchParams) {

  const res = await getCurrentResturant();

  const { skip, take } = createPagination(params)

  const categories = await db.category.findMany({
    where: { 
      restaurantId: res?.id ?? 1,
      OR: [
        { enName: { contains: params.search ?? '' } },
        { arName: { contains: params.search ?? '' } }
      ]
    },
    include: { _count: { select: { items: true } } },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })

  return categories
}

export async function getCategory(id: number) {
  return await db.category.findUnique({
    where: { id }
  })
}

export async function getCategoryItems(categoryId: number) {
  return await db.menuItem.findMany({
    where: { categoryId }
  })
}

export async function createCategory(values: z.infer<typeof CategorySchema.create>) {
  const res = await getCurrentResturant()

  const isExists = await db.category.findFirst({ where: { enName: values.enName } })
  if (isExists) return actionResponse(responseCodes.badRequest, "Category already exists.")

  await db.category.create({
    data: { ...values, restaurantId: res?.id ?? 1 }
  })
  revalidatePath(adminRoutes.categories())

  return actionResponse(responseCodes.created, "Category has been created.")
}

export async function updateCategory(id: number, values: z.infer<typeof CategorySchema.update>) {
  const isExists = await db.category.findFirst({ 
    where: { 
      enName: values.enName,
      AND: [ { id: { not: id } } ]
    } 
  })
  if (isExists) return actionResponse(responseCodes.badRequest, "Category already exists.")

  const category = await db.category.findUnique({ where: { id } })
  if (!category) return actionResponse(responseCodes.badRequest, "No category found.")

  await db.category.update({
    where: { id },
    data: { ...values }
  })

  revalidatePath(adminRoutes.categories())
  return actionResponse(responseCodes.ok, "Category has been updated.")
}

export async function deleteCategory(id: number) {
  const category = await db.category.findUnique({ where: { id } })
  if (!category) return actionResponse(responseCodes.badRequest, "No category found.")
  await db.category.delete({ where: { id } })
  revalidatePath(adminRoutes.categories())
  return actionResponse(responseCodes.ok, "Category has been deleted.")
}