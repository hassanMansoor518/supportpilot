import { useQuery } from "@tanstack/react-query";
import { billingService } from "../services/billing.service";

export function useBilling() {
  const overviewQuery = useQuery({
    queryKey: ["billingOverview"],
    queryFn: () => billingService.getOverview(),
  });

  return {
    overview: overviewQuery.data,
    isLoading: overviewQuery.isLoading,
    error: overviewQuery.error,
    refetch: overviewQuery.refetch,
  };
}

