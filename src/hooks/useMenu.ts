import queryKeys from "@/lib/query-keys";

import { useQuery } from "@tanstack/react-query";
import { getMenuItemsByCategoryId } from "@/actions/menu";

export function useCategoryMenu(categoryId: number) {

  const { data: menu, isLoading: menuLoading, isRefetching: menuRefetching, isFetching: menuFetching, refetch: refetchMenu } = useQuery({
    queryKey: queryKeys.categoryMenu(categoryId),
    queryFn: ({ queryKey }) => getMenuItemsByCategoryId(queryKey[2] as number)
  })

  return {
    menu,
    menuLoading,
    menuRefetching,
    menuFetching,
    refetchMenu
  }
}