"use server";

import { ServiceAccountSchema } from "@/schema";
import { SearchParams } from "@/types";

import { actionResponse, responseCodes } from "@/lib/response";
import { getCurrentResturant } from "./app";
import { createPagination } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { adminRoutes} from "@/lib/routes";
import { z } from "zod";

import bcrypt from 'bcrypt'
import db from "@/services/prisma";

// For Admin
export async function getServiceAccounts(params: SearchParams) {
  
  const { skip, take } = createPagination(params)
  
  const resturant = await getCurrentResturant();
  const users = await db.serviceAccount.findMany({
    where: { 
      resturantId: resturant?.id ?? 1,
      OR: [ 
        { name: { contains: params.search ?? '' } },
        { email: { contains: params.search ?? '' } }
      ]
    },
    include: { resturant: { select: { id: true, name: true } } },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })
  
  return users
}

export async function getServiceAccountById(id: number) {
  return await db.serviceAccount.findUnique({
    where: { id }
  })
}

export async function createServiceAccount(values: z.infer<typeof ServiceAccountSchema.register>) {
  const emailExists = await db.serviceAccount.findUnique({ where: { email: values.email } })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists.")

  const phoneExists = await db.serviceAccount.findUnique({ where: { phoneNumber: values.phone } })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone already exists.")

  const password = await bcrypt.hash(values.password, 10)

  await db.serviceAccount.create({
    data: { resturantId: values.resturantId ?? 1, name: values.name, password, email: values.email, phoneNumber: values.phone }
  })

  revalidatePath(adminRoutes.serviceAccounts())

  return actionResponse(responseCodes.created, "Service Account has been created.")
}

export async function updateServiceAccount(id: number, values: z.infer<typeof ServiceAccountSchema.update>) {
  
  const emailExists = await db.serviceAccount.findFirst({ 
    where: { 
      email: values.email,
      AND: [ { id: { not: id } } ]
    }
  })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists.")

  const phoneExists = await db.serviceAccount.findFirst({ 
    where: { 
      phoneNumber: values.phone,
      AND: [ { id: { not: id } } ]
    }
  })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone number already exists.")

  const user = await db.serviceAccount.findUnique({ where: { id } })
  if (!user) return actionResponse(responseCodes.badRequest, "No Service Account found.")

  await db.serviceAccount.update({
    where: { id },
    data: { name: values.name, email: values.email, phoneNumber: values.phone, resturantId: values.resturantId ?? 1 }
  })

  revalidatePath(adminRoutes.serviceAccounts())

  return actionResponse(responseCodes.ok, "Service Account has been updated.")
}

export async function deleteServiceAccount(id: number) {

  const user = await db.serviceAccount.findUnique({ where: { id } })
  if (!user) return actionResponse(responseCodes.badRequest, "No user found.")

  await db.serviceAccount.delete({
    where: { id },
  })

  revalidatePath(adminRoutes.serviceAccounts())

  return actionResponse(responseCodes.ok, "Service Account has been deleted.")
}