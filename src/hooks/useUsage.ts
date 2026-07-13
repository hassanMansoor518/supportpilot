import { useQuery } from "@tanstack/react-query";
import { usageService } from "../services/usage.service";

export function useUsage() {
  const usageQuery = useQuery({
    queryKey: ["usage"],
    queryFn: () => usageService.getUsage(),
  });

  return {
    usage: usageQuery.data,
    isLoading: usageQuery.isLoading,
    error: usageQuery.error,
    refetch: usageQuery.refetch
  };
}
