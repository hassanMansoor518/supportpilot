import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "../services/subscription.service";
import { PlanType, BillingCycle } from "../types/Subscription";

export function useSubscription() {
  const queryClient = useQueryClient();

  const subscriptionQuery = useQuery({
    queryKey: ["subscription"],
    queryFn: () => subscriptionService.getSubscription(),
  });

  const plansQuery = useQuery({
    queryKey: ["plans"],
    queryFn: () => subscriptionService.getPlans(),
  });

  const upgradeMutation = useMutation({
    mutationFn: ({ planId, cycle }: { planId: PlanType; cycle: BillingCycle }) =>
      subscriptionService.upgradeOrDowngrade(planId, cycle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => subscriptionService.cancelSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: () => subscriptionService.reactivateSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  return {
    subscription: subscriptionQuery.data,
    plans: plansQuery.data || [],
    isLoading: subscriptionQuery.isLoading || plansQuery.isLoading,
    isSubscriptionLoading: subscriptionQuery.isLoading,
    isPlansLoading: plansQuery.isLoading,
    upgrade: upgradeMutation.mutateAsync,
    isUpgrading: upgradeMutation.isPending,
    cancel: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
    reactivate: reactivateMutation.mutateAsync,
    isReactivating: reactivateMutation.isPending,
  };
}
