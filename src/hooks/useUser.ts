import queryKeys from "@/lib/query-keys";

import { getUser } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { isLoading, isRefetching, isFetching, data, refetch } = useQuery({
    queryKey: queryKeys.user(),
    queryFn: () => getUser()
  })

  return { 
    user: data,
    userLoading: isLoading,
    userRefetching: isRefetching,
    userFetching: isFetching,
    refetchUser: refetch
  }
}