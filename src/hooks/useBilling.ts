import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { billingService } from "../services/billing.service";

export function useBilling() {
  const queryClient = useQueryClient();

  const overviewQuery = useQuery({
    queryKey: ["billingOverview"],
    queryFn: () => billingService.getOverview(),
  });

  const resetDemoStateMutation = useMutation({
    mutationFn: (type: "new" | "free" | "pro") => billingService.resetDemoState(type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["usage"] });
    },
  });

  return {
    overview: overviewQuery.data,
    isLoading: overviewQuery.isLoading,
    error: overviewQuery.error,
    refetch: overviewQuery.refetch,
    resetDemoState: resetDemoStateMutation.mutate,
    isResetting: resetDemoStateMutation.isPending,
  };
}
