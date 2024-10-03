"use server"

import db from "@/services/prisma"
import bcrypt from "bcrypt"

import { AdminSchema } from "@/schema"
import { apiURL, cookieAdminName } from "@/lib/constants"
import { z } from "zod"

import { APIResponse } from "@/types"
import { cookies } from "next/headers"
import { Admin } from "@prisma/client"
import { getHeaders } from "@/services/api"
import { SearchParams } from "@/types"

import { actionResponse, responseCodes } from "@/lib/response"
import { createPagination } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/lib/routes"

type LoginResponseData = { token: string }

export async function loginAdminAction(values: z.infer<typeof AdminSchema.login>): Promise<APIResponse<LoginResponseData>> {
  const loginRequest = await fetch(`${apiURL}/admin/login`, {
    method: "POST",
    body: JSON.stringify(values),
  })
  const data = await loginRequest.json()
  cookies().set(cookieAdminName, data?.data?.token, {
    expires: Date.now() + 24 * 60 * 60 * 1000 * 30,
  })
  return data
}

export async function getAdmin(): Promise<Admin | undefined> {
  const token = cookies().get(cookieAdminName)?.value
  const requestUser = await fetch(`${apiURL}/admin`, getHeaders(token))
  const response: APIResponse<Admin> = await requestUser.json()
  const admin: Admin | undefined = response.data
  return admin
}

export async function getAppCounts() {
  const orders = await db.order.count()
  const users = await db.user.count()
  const admin = await db.admin.count()
  const categories = await db.category.count()
  const coupons = await db.coupon.count()
  const menuItems = await db.menuItem.count()
  return {
    orders,
    users,
    admin,
    categories,
    coupons,
    menuItems,
  }
}

export async function getAdmins(params: SearchParams) {
  const { skip, take } = createPagination(params)

  const admins = await db.admin.findMany({
    where: {
      OR: [{ name: { contains: params.search ?? "" } }],
    },
    orderBy: { [params.orderBy ?? "id"]: params.orderType ?? "asc" },
    skip: skip || 0,
    take,
  })
  return admins
}

export async function getAdminById(id: number) {
  return await db.admin.findUnique({
    where: { id },
  })
}

export async function createAdmin(values: z.infer<typeof AdminSchema.register>) {
  const emailExists = await db.admin.findUnique({ where: { email: values.email } })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists.")

  const phoneExists = await db.admin.findUnique({ where: { phoneNumber: values.phone } })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone already exists.")

  const password = await bcrypt.hash(values.password, 10)

  await db.admin.create({
    data: { name: values.name, email: values.email, password, phoneNumber: values.phone },
  })

  revalidatePath(adminRoutes.admins())

  return actionResponse(responseCodes.created, "Admin has been created.")
}

export async function updateAdmin(id: number, values: z.infer<typeof AdminSchema.update>) {
  const emailExists = await db.admin.findFirst({
    where: {
      email: values.email,
      AND: [{ id: { not: id } }],
    },
  })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists.")

  const phoneExists = await db.admin.findFirst({
    where: {
      phoneNumber: values.phone,
      AND: [{ id: { not: id } }],
    },
  })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone number already exists.")

  const admin = await db.admin.findUnique({ where: { id } })
  if (!admin) return actionResponse(responseCodes.badRequest, "No admin found.")

  await db.admin.update({
    where: { id },
    data: { name: values.name, email: values.email, phoneNumber: values.phone },
  })

  revalidatePath(adminRoutes.admins())

  return actionResponse(responseCodes.ok, "Admin has been updated.")
}

export async function deleteAdmin(id: number) {
  const admin = await db.admin.findUnique({ where: { id } })
  if (!admin) return actionResponse(responseCodes.badRequest, "No admin found.")

  await db.admin.delete({
    where: { id },
  })

  revalidatePath(adminRoutes.admins())

  return actionResponse(responseCodes.ok, "admin has been deleted.")
}
