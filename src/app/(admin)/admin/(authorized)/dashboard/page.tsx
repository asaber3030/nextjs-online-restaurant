import { getAppCounts } from "@/actions/admin";
import { QuickLink } from "@/app/(admin)/_components/dashboard/quick-link";
import { StatsItem } from "@/app/(admin)/_components/dashboard/stats-item";
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { adminRoutes } from "@/lib/routes";
import { Cog, Percent, ShoppingCart, Truck } from "lucide-react";
import { getCurrentResturant } from "@/actions/app";
import { cookies } from "next/headers";
import { AvailableLanguages } from "@/types";
import { cookieLangName } from "@/lib/constants";
import translate from "@/services/translate";

const DashboardPage = async () => {
  
  const counts = await getAppCounts()
  const cookiesStore = cookies()
  const restaurant = await getCurrentResturant()
  const language = (cookiesStore.get(cookieLangName)?.value ?? 'ar') as AvailableLanguages

  return (
    <div>
      <AdminTitle title={translate('dashboard', language)} />
      <div className="grid xl:grid-cols-6 grid-cols-1 md:grid-cols-4 gap-2 mt-4">
        <StatsItem icon={Truck} num={counts.orders} label={translate('totalOrders', language)} />
        <StatsItem icon={Truck} num={counts.users} label={translate('users', language)} bgColor="bg-orange-100" textColor="text-orange-800" />
        <StatsItem icon={Truck} num={counts.admin} label={translate('admins', language)} bgColor="bg-red-100" textColor="text-red-800" />
        <StatsItem icon={Truck} num={counts.categories} label={translate('categories', language)} bgColor="bg-green-100" textColor="text-green-800" />
        <StatsItem icon={Truck} num={counts.coupons} label={translate('coupons', language)} bgColor="bg-yellow-100" textColor="text-yellow-800" />
        <StatsItem icon={Truck} num={counts.menuItems} label={translate('menuItems', language)}  bgColor="bg-violet-100" textColor="text-violet-800"/>
      </div>

      <AdminTitle title={translate('quickLinks', language)} className="mt-4" />
      <div className="grid xl:grid-cols-6 grid-cols-1 gap-2 mt-4">
        <QuickLink label={translate('createUser', language)} url={adminRoutes.createUser()} />
        <QuickLink label={translate('createServiceAccount', language)} url={adminRoutes.createServiceAccount()} />
        <QuickLink label={translate('createAdmin', language)} url={adminRoutes.createAdmin()} />
        <QuickLink label={translate('createCategory', language)} url={adminRoutes.createCategory()} />
        <QuickLink label={translate('createOffer', language)} icon={Percent} url={adminRoutes.createOffer()} />
        <QuickLink label={translate('createMenuItem', language)} url={adminRoutes.createMenuItem()} />
        <QuickLink label={translate('createCoupon', language)} url={adminRoutes.createCoupon()} />
        <QuickLink label={translate('updateRestaurant', language)} icon={Cog} url={adminRoutes.updateRestaurant(restaurant?.id ?? 1)} />
        <QuickLink label={translate('orders', language)} icon={ShoppingCart} url={adminRoutes.orders()} />
      </div>

  
    </div>
  );
}
 
export default DashboardPage;