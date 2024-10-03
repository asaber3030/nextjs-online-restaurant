import { adminRoutes } from "@/lib/routes";
import { FullOffer, FullOrder } from "@/types";
import { Category, MenuItem } from "@prisma/client";
import { ChefHat, List, Percent, ShoppingCart } from "lucide-react";
import Link from "next/link";

type Props = {
  resId: number
  categories: Category[]
  offers: FullOffer[]
  menu: MenuItem[]
  orders: FullOrder[]
}

export const ViewAllItems = ({ resId, categories, offers, menu, orders }: Props) => {
  return ( 
    <div className="grid xl:grid-cols-4 gap-2">
      <Link href={adminRoutes.viewRestaurantOrders(resId)} className="border rounded-md h-fit bg-white p-4 flex flex-col gap-4 transition-all hover:border-secondaryMain">
        <ShoppingCart className='size-6 text-gray-500' />
        <h2 className="text-xl font-medium flex items-center justify-between">
          <span className="font-bold">Orders</span>
          <span className="text-secondaryMain text-sm ">{orders.length} items</span>
        </h2>
      </Link>
      <Link href={adminRoutes.viewRestaurantOffers(resId)} className="border rounded-md h-fit bg-white p-4 flex flex-col gap-4 transition-all hover:border-secondaryMain">
        <Percent className='size-6 text-gray-500' />
        <h2 className="text-xl font-medium flex items-center justify-between">
          <span className="font-bold">Offers</span>
          <span className="text-secondaryMain text-sm ">{offers.length} items</span>
        </h2>
      </Link>
      <Link href={adminRoutes.viewRestaurantMenu(resId)} className="border rounded-md h-fit bg-white p-4 flex flex-col gap-4 transition-all hover:border-secondaryMain">
        <ChefHat className='size-6 text-gray-500' />
        <h2 className="text-xl font-medium flex items-center justify-between">
          <span className="font-bold">Menu</span>
          <span className="text-secondaryMain text-sm ">{menu.length} items</span>
        </h2>
      </Link>
      <Link href={adminRoutes.viewRestaurantCategories(resId)} className="border rounded-md h-fit bg-white p-4 flex flex-col gap-4 transition-all hover:border-secondaryMain">
        <List className='size-6 text-gray-500' />
        <h2 className="text-xl font-medium flex items-center justify-between">
          <span className="font-bold">Categories</span>
          <span className="text-secondaryMain text-sm ">{categories.length} items</span>
        </h2>
      </Link>
    </div>
  );
}