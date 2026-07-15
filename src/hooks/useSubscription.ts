import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlanType, BillingCycle } from "../types/Subscription";

async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Request failed");
  }

  return data.data;
}

export function useSubscription() {
  const queryClient = useQueryClient();

  const subscriptionQuery = useQuery({
    queryKey: ["subscription"],
    queryFn: () => fetchJson("/api/subscriptions/current"),
  });

  const plansQuery = useQuery({
    queryKey: ["plans"],
    queryFn: () => fetchJson("/api/subscriptions/plans"),
  });

  const upgradeMutation = useMutation({
    mutationFn: ({ planId, cycle }: { planId: PlanType; cycle: BillingCycle }) =>
      fetchJson("/api/subscriptions/upgrade", {
        method: "POST",
        body: JSON.stringify({ planSlug: planId, billingCycle: cycle }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => fetchJson("/api/subscriptions/cancel", { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: () => fetchJson("/api/subscriptions/resume", { method: "POST" }),
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
