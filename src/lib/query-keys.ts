const queryKeys = {
  user: () => ["user"],
  coupon: (name: string) => ["coupon", "by-name", name],
  categories: () => ["categories"],
  categoryMenu: (categoryId: number) => ["menu", "category", categoryId],
}

export default queryKeys
