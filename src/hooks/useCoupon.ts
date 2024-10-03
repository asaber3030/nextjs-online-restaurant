import { getCouponByName } from "@/actions/app";
import { useQuery } from "@tanstack/react-query";

import queryKeys from "@/lib/query-keys";

export function useCoupon(name: string) {

  const { data: coupon, isLoading: couponLoading, isRefetching: couponRefetching, isFetching: couponFetching, refetch: refetchCoupon } = useQuery({
    queryKey: queryKeys.coupon(name),
    queryFn: ({ queryKey }) => getCouponByName(queryKey[2])
  })

  return {
    coupon,
    couponLoading,
    couponRefetching,
    couponFetching,
    refetchCoupon
  }
}