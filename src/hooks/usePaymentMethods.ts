import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";

export function usePaymentMethods() {
  const queryClient = useQueryClient();

  const paymentMethodsQuery = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => paymentService.getPaymentMethods(),
  });

  const addMutation = useMutation({
    mutationFn: (card: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      cardholderName: string;
      billingAddress: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
    }) => paymentService.addPaymentMethod(card),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => paymentService.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: (id: string) => paymentService.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["billingOverview"] });
    },
  });

  return {
    paymentMethods: paymentMethodsQuery.data || [],
    isLoading: paymentMethodsQuery.isLoading,
    error: paymentMethodsQuery.error,
    addPaymentMethod: addMutation.mutateAsync,
    isAdding: addMutation.isPending,
    deletePaymentMethod: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    setDefaultPaymentMethod: setDefaultMutation.mutateAsync,
    isSettingDefault: setDefaultMutation.isPending,
  };
}
