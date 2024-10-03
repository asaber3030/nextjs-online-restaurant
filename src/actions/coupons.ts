"use server";

import db from "@/services/prisma";

import { SearchParams } from "@/types";

import { actionResponse, responseCodes } from "@/lib/response";
import { createPagination } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/routes";
import { z } from "zod";

import { CouponSchema } from "@/schema";

export async function getCoupons(params: SearchParams) {
  const { skip, take } = createPagination(params)

  const coupons = await db.coupon.findMany({
    where: { 
      OR: [ { name: { contains: params.search ?? '' } } ]
    },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })
  return coupons
}

export async function getCoupon(id: number) {
  return await db.coupon.findUnique({
    where: { id }
  })
}

export async function createCoupon(values: z.infer<typeof CouponSchema.create>) {
  const isExists = await db.coupon.findFirst({ where: { name: values.name } })
  if (isExists) return actionResponse(responseCodes.badRequest, "Coupon already exists.")

  await db.coupon.create({
    data: values
  })
  revalidatePath(adminRoutes.coupons())
  return actionResponse(responseCodes.created, "Coupon has been created.")
}

export async function updateCoupon(id: number, values: z.infer<typeof CouponSchema.update>) {
  const isExists = await db.coupon.findFirst({ 
    where: { 
      name: values.name,
      AND: [ { id: { not: id } } ]
    } 
  })
  if (isExists) return actionResponse(responseCodes.badRequest, "Coupon already exists.")

  const coupon = await db.coupon.findUnique({ where: { id } })
  if (!coupon) return actionResponse(responseCodes.badRequest, "No Coupon found.")

  await db.coupon.update({
    where: { id },
    data: values
  })

  revalidatePath(adminRoutes.coupons())
  return actionResponse(responseCodes.ok, "Coupon has been updated.")
}

export async function deleteCoupon(id: number) {
  const coupon = await db.coupon.findUnique({ where: { id } })
  if (!coupon) return actionResponse(responseCodes.badRequest, "No Coupon found.")
  await db.coupon.delete({
    where: { id },
  })
  revalidatePath(adminRoutes.coupons())
  return actionResponse(responseCodes.ok, "Coupon has been deleted.")
}