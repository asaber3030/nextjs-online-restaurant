import { Address, Coupon, MenuItem, Order, OrderItem, OrderOffer, Offer, OfferItems } from "@prisma/client"

export type SearchParams = {
  search?: string
  orderBy?: string
  orderType?: string
  take?: number
  skipLimit?: boolean
  page?: number
}

export type OrderBy = {
  name: string
  label: string
}

export type APIResponse<T> = {
  message: string
  status: number
  data?: T
}

export type CartItem = {
  id: number
  arName: string | null
  enName: string | null
  description: string | null
  categoryId: number
  image: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type OfferPriceCartItem = {
  offerId: number
  price: number
}

export type FullOrder = Order & {
  address: Address
  coupon: Coupon | null
  items: (OrderItem & { item: MenuItem })[]
}

export type FullOrderOffer = OrderOffer & {
  offer: Offer & {
    offerItems: (OfferItems & { item: MenuItem })[]
  }
}

export type FullOrderItem = OrderItem & { item: MenuItem }

export type FullOffer = Offer & {
  offerItems: (OfferItems & { item: MenuItem })[]
}

export type FullOfferItem = OfferItems & { item: MenuItem }

export type AvailableLanguages = "en" | "ar"
