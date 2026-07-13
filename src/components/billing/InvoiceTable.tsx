"use client";

import React, { useState, useMemo } from "react";
import { Invoice, InvoiceStatus } from "@/src/types/Invoice";
import { useInvoices } from "@/src/hooks/useInvoices";
import InvoiceStatusBadge from "./InvoiceStatusBadge";
import { Search, Download, FileText, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { toast } from "react-hot-toast";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  const { downloadPdf } = useInvoices();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Invoice>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const itemsPerPage = 5;

  const handleDownload = async (invoiceId: string) => {
    setDownloadingId(invoiceId);
    try {
      const link = await downloadPdf(invoiceId);
      toast.success(`Downloading invoice ${invoiceId}`);
      // Simulate file download by opening in a new window
      window.open(link, "_blank");
    } catch (err: any) {
      toast.error("Download failed. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Filter and sort invoices
  const filteredInvoices = useMemo(() => {
    let result = [...invoices];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (inv) =>
          inv.id.toLowerCase().includes(term) ||
          inv.paymentMethod.last4.includes(term) ||
          inv.paymentMethod.brand.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((inv) => inv.status === statusFilter);
    }

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return result;
  }, [invoices, searchTerm, statusFilter, sortField, sortOrder]);

  // Pagination calculations
  const totalPages = Math.max(Math.ceil(filteredInvoices.length / itemsPerPage), 1);
  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInvoices, currentPage]);

  // Adjust page number if current page is out of bounds
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden font-sans">
      {/* Table Filters & Header */}
      <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Invoice ID or card details..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
            <SlidersHorizontal size={14} />
            Filter Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer font-medium text-gray-700"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="open">Open</option>
            <option value="failed">Failed</option>
            <option value="void">Void</option>
            <option value="uncollectible">Uncollectible</option>
          </select>
        </div>
      </div>

      {/* Actual Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-4 cursor-pointer hover:bg-gray-150/40 select-none" onClick={() => handleSort("id")}>
                <div className="flex items-center gap-1.5">
                  Invoice ID
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:bg-gray-150/40 select-none" onClick={() => handleSort("date")}>
                <div className="flex items-center gap-1.5">
                  Date
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:bg-gray-150/40 select-none" onClick={() => handleSort("amount")}>
                <div className="flex items-center gap-1.5">
                  Amount
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-6 py-4">Tax</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {paginatedInvoices.length > 0 ? (
              paginatedInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-6 py-4.5 font-semibold text-gray-900 flex items-center gap-2">
                    <FileText size={16} className="text-gray-400 shrink-0" />
                    {inv.id}
                  </td>
                  <td className="px-6 py-4.5">
                    {new Date(inv.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4.5 font-bold text-gray-900">
                    ${inv.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4.5 text-gray-500">
                    ${inv.tax.toFixed(2)}
                  </td>
                  <td className="px-6 py-4.5">
                    <InvoiceStatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-4.5">
                    <span className="capitalize text-gray-800 font-medium">
                      {inv.paymentMethod.brand}
                    </span>
                    <span className="text-gray-400 text-xs font-semibold ml-1.5">
                      •••• {inv.paymentMethod.last4}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <button
                      onClick={() => handleDownload(inv.id)}
                      disabled={downloadingId === inv.id}
                      className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/60 rounded-xl transition-all inline-flex items-center justify-center disabled:opacity-50 cursor-pointer active:scale-95"
                      title="Download Invoice PDF"
                    >
                      {downloadingId === inv.id ? (
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Download size={16} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileText size={32} className="text-gray-300" />
                    <p className="font-semibold text-gray-500">No invoices found</p>
                    <p className="text-xs text-gray-400 max-w-xs">
                      We couldn't find any invoices matching your search criteria. Try adjusting your filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div className="font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredInvoices.length)} of{" "}
            {filteredInvoices.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-50 disabled:hover:bg-white cursor-pointer transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-semibold text-gray-800">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-50 disabled:hover:bg-white cursor-pointer transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
