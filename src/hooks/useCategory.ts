import { getCategories } from "@/actions/app";
import { useQuery } from "@tanstack/react-query";

import queryKeys from "@/lib/query-keys";

export function useCategories() {

  const { data: categories, isLoading: categoriesLoading, isRefetching: categoriesRefetching, isFetching: categoriesFetching, refetch: refetchCategories } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: () => getCategories()
  })

  return {
    categories,
    categoriesLoading,
    categoriesRefetching,
    categoriesFetching,
    refetchCategories
  }
}