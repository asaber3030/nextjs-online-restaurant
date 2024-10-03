export const routes = {
  login: () => `/login`,
  register: () => `/register`,
  home: () => `/`,
  dashboard: () => `/dashboard`,
  profile: (prefix?: string) => prefix ? `/profile/${prefix}` : `/profile`,
  viewOrder: (orderId: number) => `/profile/orders/${orderId}`,
  completeOrder: () => `/complete-order`,
  menu: () => `/menu`,

  // Admin routes
  adminLogin: () => `/admin/login`,
  adminDashboard: () => `/admin/dashboard`,
}

export const adminRoutes = {
  // Categories
  categories: () => `/admin/categories`,
  createCategory: () => `/admin/categories/create`,
  updateCategory: (id: number) => `/admin/categories/${id}/update`,
  deleteCategory: (id: number) => `/admin/categories/${id}/delete`,
  categoryItems: (id: number) => `/admin/categories/${id}/items`,

  // coupons
  coupons: () => `/admin/coupons`,
  createCoupon: () => `/admin/coupons/create`,
  updateCoupon: (id: number) => `/admin/coupons/${id}/update`,
  deleteCoupon: (id: number) => `/admin/coupons/${id}/delete`,

  // Offers
  offers: () => `/admin/offers`,
  createOffer: () => `/admin/offers/create`,
  updateOffer: (id: number) => `/admin/offers/${id}/update`,
  deleteOffer: (id: number) => `/admin/offers/${id}/delete`,

  // Orders
  orders: () => `/admin/orders`,
  viewOrder: (id: number) => `/admin/orders/${id}/view`,

  // Restaurants
  restaurants: () => `/admin/restaurants`,
  createRestaurant: () => `/admin/restaurants/create`,
  updateRestaurant: (id: number) => `/admin/restaurants/${id}/update`,
  viewRestaurant: (id: number) => `/admin/restaurants/${id}/view`,
  viewRestaurantMenu: (id: number) => `/admin/restaurants/${id}/view/menu`,
  viewRestaurantOffers: (id: number) => `/admin/restaurants/${id}/view/offers`,
  viewRestaurantOrders: (id: number) => `/admin/restaurants/${id}/view/orders`,
  viewRestaurantCategories: (id: number) => `/admin/restaurants/${id}/view/categories`,
  deleteRestaurant: (id: number) => `/admin/restaurants/${id}/delete`,

  // Users
  users: () => `/admin/users`,
  createUser: () => `/admin/users/create`,
  updateUser: (id: number) => `/admin/users/${id}/update`,
  deleteUser: (id: number) => `/admin/users/${id}/delete`,
  userOrders: (id: number) => `/admin/users/${id}/orders`,

  // service-accounts
  serviceAccounts: () => `/admin/service-accounts`,
  createServiceAccount: () => `/admin/service-accounts/create`,
  updateServiceAccount: (id: number) => `/admin/service-accounts/${id}/update`,
  deleteServiceAccount: (id: number) => `/admin/service-accounts/${id}/delete`,

  // Admins
  admins: () => `/admin/admins`,
  createAdmin: () => `/admin/admins/create`,
  updateAdmin: (id: number) => `/admin/admins/${id}/update`,
  deleteAdmin: (id: number) => `/admin/admins/${id}/delete`,

  // Admins
  menuItems: () => `/admin/menu`,
  createMenuItem: () => `/admin/menu/create`,
  updateMenuItem: (id: number) => `/admin/menu/${id}/update`,
  deleteMenuItem: (id: number) => `/admin/menu/${id}/delete`,

}