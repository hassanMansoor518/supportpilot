import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoiceService } from "../services/invoice.service";

export function useInvoices() {
  const queryClient = useQueryClient();

  const invoicesQuery = useQuery({
    queryKey: ["invoices"],
    queryFn: () => invoiceService.getInvoices(),
  });

  const downloadPdfMutation = useMutation({
    mutationFn: (invoiceId: string) => invoiceService.downloadPdf(invoiceId),
  });

  return {
    invoices: invoicesQuery.data || [],
    isLoading: invoicesQuery.isLoading,
    error: invoicesQuery.error,
    downloadPdf: downloadPdfMutation.mutateAsync,
    isDownloading: downloadPdfMutation.isPending,
    refetch: invoicesQuery.refetch,
  };
}
