"use server"

import { UserSchema, AddressSchema } from "@/schema"
import { APIResponse, SearchParams } from "@/types"
import { OrderStatus, User } from "@prisma/client"

import { actionResponse, responseCodes } from "@/lib/response"
import { apiURL, cookieUserName } from "@/lib/constants"
import { revalidatePath } from "next/cache"
import { getHeaders } from "@/services/api"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { adminRoutes, routes } from "@/lib/routes"
import { z } from "zod"

import bcrypt from "bcrypt"
import db from "@/services/prisma"
import { createPagination } from "@/lib/utils"

//////////// User Details ////////////

export async function getUser(): Promise<User | undefined> {
  const token = cookies().get(cookieUserName)?.value
  const requestUser = await fetch(`${apiURL}/user`, getHeaders(token))
  const response: APIResponse<User> = await requestUser.json()
  const user: User | undefined = response.data
  return user
}

export async function updateUserAction(values: z.infer<typeof UserSchema.update>) {
  const user = await getUser()
  if (!user) return redirect(routes.login())

  const parsedValues = UserSchema.update.safeParse(values)
  if (!parsedValues) return actionResponse(400, "Failed to update check the fields")

  const data = parsedValues.data

  if (data?.email) {
    const emailExists = await db.user.findUnique({
      where: { email: data?.email, AND: [{ id: { not: user.id } }] },
    })
    if (emailExists) return actionResponse(responseCodes.conflict, "Email already exists")
  }

  if (data?.phone) {
    const phoneExists = await db.user.findUnique({
      where: { phoneNumber: data?.phone, AND: [{ id: { not: user.id } }] },
    })
    if (phoneExists) return actionResponse(responseCodes.conflict, "Phone already exists")
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name: data?.name,
        email: data?.email,
        phoneNumber: data?.phone,
      },
    })

    return actionResponse(200, "User has been updated", updatedUser)
  } catch (error) {
    return actionResponse(500, "Failed to update")
  }
}

export async function updateUserPasswordAction(values: z.infer<typeof UserSchema.changePassword>) {
  const user = await getUser()
  if (!user) return redirect(routes.login())

  const fetchPassword = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, password: true },
  })
  if (!fetchPassword) return redirect(routes.login())

  const isValidPassword = await bcrypt.compare(values.currentPassword, fetchPassword.password)
  if (!isValidPassword) return actionResponse(401, "Invalid password")

  try {
    const newPassword = await bcrypt.hash(values.newPassword, 10)
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { password: newPassword },
    })
    return actionResponse(200, "Password has been changed", updatedUser)
  } catch (error: any) {
    return actionResponse(500, error?.message)
  }
}

export async function countOrders() {
  const user = await getUser()
  if (!user) return redirect(routes.login())
  const countOrders = await db.order.count({ where: { userId: user.id } })
  return countOrders
}

export async function getCurrentOrder() {
  const user = await getUser()
  if (!user) return redirect(routes.login())

  const currentOrder = await db.order.findFirst({
    where: {
      statusNumber: { lt: 5 },
      AND: [{ userId: user.id }],
    },
    include: {
      items: { include: { item: true } },
      address: true,
      coupon: true,
    },
  })
  return currentOrder
}

export async function getSingleOrder(orderId: number) {
  const user = await getUser()
  if (!user) return redirect(routes.login())

  const order = await db.order.findUnique({
    where: { userId: user.id, id: orderId },
    include: {
      items: { include: { item: true } },
      address: true,
      coupon: true,
    },
  })

  if (!order) return notFound()

  return order
}

export async function getOrders() {
  const user = await getUser()
  if (!user) return redirect(routes.login())

  const orders = await db.order.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
    include: {
      items: { include: { item: true } },
      address: true,
      coupon: true,
    },
  })
  return orders
}

//////////// Addresses ////////////

export async function newAddressAction(values: z.infer<typeof AddressSchema.create>) {
  const user = await getUser()
  if (!user) return redirect("/login")

  const countAddress = await db.address.count({
    where: { userId: user.id },
  })

  const isAddressExist = await db.address.findUnique({
    where: { phoneNumber: values.phoneNumber },
  })

  if (isAddressExist) return actionResponse(409, "Phone number already exists.")

  if (countAddress >= 5) {
    return actionResponse(401, "Cannot create more than 5 addresses")
  }

  await db.address.create({
    data: {
      userId: user.id,
      ...values,
    },
  })

  revalidatePath(routes.profile("addresses"))

  return actionResponse(201, "Address has been created.")
}

export async function updateAddressAction(addressId: number, values: z.infer<typeof AddressSchema.update>) {
  const user = await getUser()
  if (!user) return redirect("/login")

  const isAddressExist = await db.address.findUnique({
    where: { phoneNumber: values.phoneNumber, AND: [{ id: { not: addressId } }] },
  })
  if (isAddressExist) return actionResponse(409, "Phone number already exists.")

  await db.address.update({
    where: { id: addressId },
    data: {
      userId: user.id,
      ...values,
    },
  })

  revalidatePath(routes.profile("addresses"))
  return actionResponse(201, "Address has been updated.")
}

export async function deleteAddressAction(addressId: number) {
  const user = await getUser()
  if (!user) return redirect("/login")

  const isAddressExist = await db.address.findUnique({
    where: { id: addressId },
  })
  if (!isAddressExist) return actionResponse(409, "Address doesn't exist.")

  await db.address.delete({
    where: { id: addressId },
  })

  revalidatePath(routes.profile("addresses"))
  return actionResponse(201, "Address has been deleted.")
}

export async function getUserAddresses() {
  const user = await getUser()
  if (!user) return redirect(routes.login())

  const addresses = await db.address.findMany({
    where: { userId: user.id },
  })

  return addresses
}

export async function doesUserHasAddress() {
  const user = await getUser()
  if (!user) return redirect(routes.login())
  const addresses = await db.address.findMany({
    where: { userId: user.id },
  })
  return addresses.length > 0
}

// For Admin
export async function getUsers(params: SearchParams) {
  const { skip, take } = createPagination(params)
  const users = await db.user.findMany({
    where: {
      OR: [{ name: { contains: params.search ?? "" } }, { email: { contains: params.search ?? "" } }],
    },
    orderBy: { [params.orderBy ?? "id"]: params.orderType ?? "asc" },
    skip: skip || 0,
    take,
  })
  return users
}

export async function getUserById(id: number) {
  return await db.user.findUnique({
    where: { id },
  })
}

export async function createUser(values: z.infer<typeof UserSchema.register>) {
  const emailExists = await db.user.findUnique({ where: { email: values.email } })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists.")

  const phoneExists = await db.user.findUnique({ where: { phoneNumber: values.phone } })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone already exists.")

  const password = await bcrypt.hash(values.password, 10)
  await db.user.create({
    data: { name: values.name, password, email: values.email, phoneNumber: values.phone },
  })
  revalidatePath(adminRoutes.users())
  return actionResponse(responseCodes.created, "user has been created.")
}

export async function updateUser(id: number, values: z.infer<typeof UserSchema.update>) {
  const emailExists = await db.user.findFirst({
    where: {
      email: values.email,
      AND: [{ id: { not: id } }],
    },
  })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists.")

  const phoneExists = await db.user.findFirst({
    where: {
      phoneNumber: values.phone,
      AND: [{ id: { not: id } }],
    },
  })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone number already exists.")

  const user = await db.user.findUnique({ where: { id } })
  if (!user) return actionResponse(responseCodes.badRequest, "No User found.")

  await db.user.update({
    where: { id },
    data: { name: values.name, email: values.email, phoneNumber: values.phone },
  })

  revalidatePath(adminRoutes.users())
  return actionResponse(responseCodes.ok, "User has been updated.")
}

export async function deleteUser(id: number) {
  const user = await db.user.findUnique({ where: { id } })
  if (!user) return actionResponse(responseCodes.badRequest, "No user found.")
  await db.user.delete({
    where: { id },
  })
  revalidatePath(adminRoutes.users())
  return actionResponse(responseCodes.ok, "User has been deleted.")
}
