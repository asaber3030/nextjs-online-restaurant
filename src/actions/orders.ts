"use server";

import db from "@/services/prisma";

import { createPagination } from "@/lib/utils";
import { getCurrentResturant } from "./app";

import { SearchParams } from "@/types";
import { actionResponse, responseCodes } from "@/lib/response";
import { revalidatePath } from "next/cache";
import { adminRoutes, routes } from "@/lib/routes";
import { OrderStatus } from "@prisma/client";
import { OrderStatusArray } from "@/lib/lists";

export async function getMenuItemsByCategoryId(categoryId: number) {
  const menuItems = await db.menuItem.findMany({ where: { categoryId } })
  return menuItems
}

export async function getOrders(params: SearchParams) {

  const { skip, take } = createPagination(params)
  
  const res = await getCurrentResturant()
  const orders = await db.order.findMany({
    where: { 
      restaurantId: res?.id ?? 1,
      OR: [ { restaurantId: res?.id ?? 1 } ]
    },
    include: { 
      coupon: true, 
      user: true,
      _count: {
        select: { items: true }
      }
    },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })

  return orders
}

export async function getUserOrders(id: number, params: SearchParams) {

  const { skip, take } = createPagination(params)
  
  const res = await getCurrentResturant()
  const orders = await db.order.findMany({
    where: { 
      restaurantId: res?.id ?? 1,
      userId: id,
      OR: [ { restaurantId: res?.id ?? 1 } ]
    },
    include: { 
      coupon: true, 
      user: true,
      _count: {
        select: { items: true }
      }
    },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })

  return orders
}

export async function getOrder(id: number) {
  const order = await db.order.findUnique({
    where: { id },
    include: {
      _count: { select: { items: true } },
      coupon: true
    }
  })
  return order
}

export async function getOrderUser(id: number) {
  const order = await db.order.findUnique({
    where: { id },
    select: { userId: true, id: true }
  })
  return await db.user.findUnique({ where: { id: order?.userId }, select: { id: true, name: true, email: true, phoneNumber: true, createdAt: true, updatedAt: true } })
}

export async function getOrderAddress(addressId: number) {
  const address = await db.address.findUnique({ where: { id: addressId } })
  return address
}

export async function getOrderOffers(orderId: number) {
  const offers = await db.orderOffer.findMany({ 
    where: { orderId },
    include: {
      offer: {
        include: { offerItems: { include: { item: true } } }
      }
    }
   })
  return offers
}

export async function getOrderItems(orderId: number) {
  const items = await db.orderItem.findMany({ 
    where: { orderId },
    include: { item: true }
   })
  return items
}

export async function getOrderRestaurant(orderId: number) {
  const order = await db.order.findUnique({ where: { id: orderId } })
  const restaurant = await db.restaurant.findMany({ 
    where: { id: order?.id }
   })
  return restaurant
}

export async function cancelOrderAction(orderId: number) {
  const order = await db.order.findUnique({ where: { id: orderId } })
  if (!order) return actionResponse(responseCodes.badRequest, "Couldn't find the order")
  if (order.statusNumber > 2) {
    return actionResponse(responseCodes.badRequest, "Can't cancel the order.")
  }
  await db.order.delete({ where: { id: order.id } })
  revalidatePath(routes.profile('orders'))
  return actionResponse(responseCodes.ok, "Order has been cancelled.")
}

export async function changeOrderStatus(orderId: number, status: OrderStatus, statusNumber: number) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { id: true, status: true }
  })
  if (!order) return actionResponse(responseCodes.badRequest, 'Order doesnot exist.')

  if (!OrderStatusArray.includes(status)) {
    return actionResponse(responseCodes.badRequest, 'Invalid Order Status')
  }
  if (statusNumber <= 0 && statusNumber > 6) {
    return actionResponse(responseCodes.badRequest, 'Invalid Order Status Number')
  }

  if (order.status === OrderStatus.Delivered) {
    return actionResponse(responseCodes.badRequest, 'Cannot update order from Delivered Status')
  }

  await db.order.update({
    where: { id: order.id },
    data: { status, statusNumber }
  })

  revalidatePath(adminRoutes.viewOrder(orderId))
  revalidatePath(adminRoutes.orders())

  return actionResponse(responseCodes.ok, 'Order status has been updated!')

}