import { Check, ChefHat, Eye, MailQuestion, PackageCheck, PhoneCall, Send, ShoppingCart, Trash, TriangleAlert, Truck, User } from "lucide-react";
import { routes } from "./routes";
import { OrderStatus } from "@prisma/client";

export const profileSidebarList = [
  { id: 1, label: 'profile', url: routes.profile(), icon: User },
  { id: 3, label: 'orders', url: routes.profile('orders'), icon: ShoppingCart },
  { id: 2, label: 'addresses', url: routes.profile('addresses'), icon: Send },
  { id: 4, label: 'deleteAccount', url: routes.profile('delete-account'), icon: Trash },
]
export const profileSecondSidebarList = [
  { id: 1, label: 'aboutUs', url: '/about-us', icon: MailQuestion },
  { id: 3, label: 'contactUs', url: '/contact-us', icon: PhoneCall },
  { id: 2, label: 'report', url: '/report', icon: TriangleAlert }
]

export const orderStatusIconList = [
  Check,
  Eye,
  ChefHat,
  Truck,
  PackageCheck
]

export const allowedImages = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/svg',
]

export const OrderStatusArray = [
  OrderStatus.JustOrdered,
  OrderStatus.Reviewed,
  OrderStatus.BeingCooked,
  OrderStatus.OutForDelivery,
  OrderStatus.Delivered
]