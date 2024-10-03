"use server";

import db from "@/services/prisma";

import { SearchParams } from "@/types";

import { actionResponse, responseCodes } from "@/lib/response";
import { createPagination } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/routes";
import { z } from "zod";

import { OfferItemsSchema, OfferSchema } from "@/schema";
import { getCurrentResturant } from "./app";
import { Offer } from "@prisma/client";

export async function getOffers(params: SearchParams) {
  const res = await getCurrentResturant()
  const { skip, take } = createPagination(params)
  const offers = await db.offer.findMany({
    where: {
      resturantId: res?.id ?? 1,
      OR: [ 
        { enTitle: { contains: params.search ?? '' } }, 
        { arTitle: { contains: params.search ?? '' } }, 
        { enDescription: { contains: params.search ?? '' } }, 
        { arDescription: { contains: params.search ?? '' } }, 
      ]
    },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })
  return offers
}

export async function getOffersLimit(limit: number = 5) {
  const res = await getCurrentResturant()
  const offers = await db.offer.findMany({
    where: { resturantId: res?.id ?? 1 },
    orderBy: { id: 'desc' },
    include: {
      offerItems: { include: { item: true } }
    },
    take: limit
  })
  return offers
}

export async function getOffer(id: number) {
  return await db.offer.findUnique({
    where: { id },
    include: {
      offerItems: {
        include: { item: true }
      }
    },
  })
}

export async function createOffer(values: z.infer<typeof OfferSchema.create>) {
  const res = await getCurrentResturant()
  const offer = await db.offer.create({
    data: {
      ...values,
      resturantId: res?.id ?? 1
    }
  })
  revalidatePath(adminRoutes.offers())
  return actionResponse<Offer>(responseCodes.created, "Offer has been created.", offer)
}

export async function updateOffer(id: number, values: z.infer<typeof OfferSchema.update>) {
  const offer = await db.offer.findUnique({ where: { id } })
  if (!offer) return actionResponse(responseCodes.badRequest, "No offer found.")

  await db.offer.update({
    where: { id },
    data: values
  })

  revalidatePath(adminRoutes.offers())
  return actionResponse(responseCodes.ok, "Offer has been updated.")
}

export async function deleteOffer(id: number) {
  const offer = await db.offer.findUnique({ where: { id } })
  if (!offer) return actionResponse(responseCodes.badRequest, "No offer found.")
  await db.offer.delete({
    where: { id },
  })
  revalidatePath(adminRoutes.offers())
  return actionResponse(responseCodes.ok, "Offer has been deleted.")
}

export async function createOfferItem(offerId: number, values: z.infer<typeof OfferItemsSchema.create>) {
  const offerExists = await db.offer.findUnique({
    where: { id: offerId }
  })
  if (!offerExists) return actionResponse(responseCodes.badRequest, "Item doesn't exist.")
  await db.offerItems.create({
    data: {
      ...values,
      offerId
    }
  })
  revalidatePath(adminRoutes.updateOffer(offerId))
  return actionResponse(responseCodes.ok, "Item has been added")
}

export async function updateOfferItem(id: number, values: z.infer<typeof OfferItemsSchema.update>) {
  const itemExists = await db.offerItems.findUnique({
    where: { id }
  })
  if (!itemExists) return actionResponse(responseCodes.badRequest, "Item doesn't exist.")

  const updated = await db.offerItems.update({
    where: { id },
    data: values
  })

  revalidatePath(adminRoutes.updateOffer(itemExists.offerId))
  return actionResponse(responseCodes.ok, "Item has been updated")
}

export async function deleteOfferItem(id: number) {
  const itemExists = await db.offerItems.findUnique({
    where: { id }
  })
  if (!itemExists) return actionResponse(responseCodes.badRequest, "Item doesn't exist.")

  await db.offerItems.delete({
    where: { id }
  })
  revalidatePath(adminRoutes.updateOffer(itemExists.offerId))
  return actionResponse(responseCodes.ok, "Item has been deleted")
}