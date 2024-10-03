"use server";

import db from "@/services/prisma";
import moment from "moment";

import { CartItem, FullOffer } from "@/types";

import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { cookies } from "next/headers";
import { cookieResturantName } from "@/lib/constants";
import { getCurrentOrder, getUser } from "./user";
import { actionResponse, responseCodes } from "@/lib/response";
import { revalidatePath } from "next/cache";

export async function getResturants() {
  return await db.restaurant.findMany();
}

export async function getCurrentResturant() {
  const cookiesStore = cookies();
  const resturantId = cookiesStore.get(cookieResturantName)?.value
    ? Number(cookiesStore.get(cookieResturantName)?.value)
    : 1;
  const resturant = await db.restaurant.findUnique({
    where: { id: resturantId ?? 1 },
  });
  return resturant;
}

export async function getCategoriesOnly(limit: number = 10) {
  const resturant = await getCurrentResturant();
  return await db.category.findMany({
    where: { restaurantId: resturant?.id },
    orderBy: { id: "desc" },
    include: {
      _count: { select: { items: true } },
    },
    take: limit,
  });
}

export async function getItemsOnly(limit: number = 10) {
  const resturant = await getCurrentResturant();
  return await db.menuItem.findMany({
    where: { category: { restaurantId: resturant?.id }, offerPrice: 0 },
    orderBy: { id: "desc" },
    take: limit,
  });
}

export async function getFriendsItemsOnly(limit: number = 10) {
  const resturant = await getCurrentResturant();
  return await db.menuItem.findMany({
    where: { category: { restaurantId: resturant?.id }, offerPrice: { gt: 0 } },
    orderBy: { id: "desc" },
    take: limit,
  });
}

export async function getCategories() {
  const resturant = await getCurrentResturant();
  return await db.category.findMany({
    where: { restaurantId: resturant?.id },
    include: {
      items: true,
      _count: { select: { items: true } },
    },
  });
}

export async function getCouponByName(name: string) {
  return await db.coupon.findUnique({
    where: { name },
  });
}

export async function getCouponById(id: number | undefined) {
  return await db.coupon.findUnique({
    where: { id },
  });
}

export async function createOrder(
  cart: CartItem[],
  offerCart: FullOffer[],
  couponId: number | undefined,
  addressId: number,
  deliveryValue: number = 20
) {
  type TypeRe = { clearAll: boolean };

  const user = await getUser();
  if (!user) return redirect(routes.login());

  const currentRes = await getCurrentResturant();
  let discountValuePercentage = 0;

  if (couponId) {
    const coupon = await getCouponById(couponId);
    if (!coupon || !coupon.active || coupon.usages === 0) {
      return actionResponse<TypeRe>(
        responseCodes.badRequest,
        "Coupon isn't available anymore."
      );
    }
    discountValuePercentage = coupon.discount ? coupon.discount / 100 : 0;
  }

  if (!addressId)
    return actionResponse<TypeRe>(
      responseCodes.badRequest,
      "Address isn't available!"
    );

  const address = await db.address.findUnique({ where: { id: addressId } });
  if (!address)
    return actionResponse<TypeRe>(
      responseCodes.badRequest,
      "Address isn't available!"
    );

  let subTotal = 0;

  const subTotalArray = cart.map((item) => (subTotal += item.totalPrice));
  const subTotalOfOffer = offerCart.map((item) => (subTotal += item.price));
  const discountValue = subTotal * discountValuePercentage;
  const total = subTotal - discountValue + deliveryValue;

  const hasCurrentOrder = await getCurrentOrder();
  if (hasCurrentOrder)
    return actionResponse<TypeRe>(
      responseCodes.badRequest,
      "Cannot order twice at a time."
    );

  const newOrder = await db.order.create({
    data: {
      addressId: address.id,
      userId: user.id,
      couponId: couponId ? couponId : null,
      paymentMethod: "Cash",
      discountValue,
      deliveryValue,
      subTotal,
      total,
      orderedAt: new Date(moment.now()),
      estimatedTime: 50,
      restaurantId: currentRes?.id ?? 1,
    },
  });

  cart.forEach(async (item) => {
    const newItem = await db.orderItem.create({
      data: {
        orderId: newOrder.id,
        itemId: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      },
    });
  });

  if (offerCart.length > 0) {
    offerCart.forEach(async (item) => {
      const newItem = await db.orderOffer.create({
        data: {
          orderId: newOrder.id,
          offerId: item.id,
        },
      });
    });
  }

  revalidatePath(routes.profile("orders"));
  return actionResponse<TypeRe>(
    responseCodes.created,
    "Order has been placed successfully!",
    {
      clearAll: true,
    }
  );
}

export async function getOrderOffers(orderId: number) {
  const offers = await db.orderOffer.findMany({
    where: { orderId },
    include: {
      offer: {
        include: {
          offerItems: { include: { item: true } },
        },
      },
    },
  });
  return offers;
}

export async function getResturantOffers() {
  const resturant = await getCurrentResturant();
  const offers = await db.offer.findMany({
    where: { resturantId: resturant?.id ?? 1 },
    include: {
      offerItems: {
        include: { item: true },
      },
    },
  });
  return offers;
}
