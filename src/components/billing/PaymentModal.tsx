"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import { X, CreditCard, Loader2, Landmark } from "lucide-react";
import { toast } from "react-hot-toast";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const cardSchema = z.object({
  cardNumber: z.string().min(12, "Card number must be at least 12 digits").max(19, "Card number too long").regex(/^\d+$/, "Card number must contain only numbers"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be 3 or 4 digits").max(4, "CVV must be 3 or 4 digits").regex(/^\d+$/, "CVV must contain only numbers"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  line1: z.string().min(5, "Billing address line 1 is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal/Zip code is required"),
  country: z.string().min(2, "Country is required"),
});

type CardFormValues = z.infer<typeof cardSchema>;

export default function PaymentModal({ open, onClose }: PaymentModalProps) {
  const { addPaymentMethod, isAdding } = usePaymentMethods();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
    },
  });

  const onSubmit = async (values: CardFormValues) => {
    try {
      await addPaymentMethod({
        cardNumber: values.cardNumber,
        expiryDate: values.expiryDate,
        cvv: values.cvv,
        cardholderName: values.cardholderName,
        billingAddress: {
          line1: values.line1,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
        },
      });
      toast.success("Card added successfully.");
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to add payment method.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10 my-8"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <CreditCard size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Add Payment Method</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                {/* Cardholder Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("cardholderName")}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                  />
                  {errors.cardholderName && (
                    <span className="text-xs text-red-500 font-medium mt-1 block">
                      {errors.cardholderName.message}
                    </span>
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                      type="text"
                      placeholder="4111222233334444"
                      {...register("cardNumber")}
                      className="w-full pl-10 pr-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  {errors.cardNumber && (
                    <span className="text-xs text-red-500 font-medium mt-1 block">
                      {errors.cardNumber.message}
                    </span>
                  )}
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="12/28"
                      {...register("expiryDate")}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                    />
                    {errors.expiryDate && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">
                        {errors.expiryDate.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      {...register("cvv")}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                    />
                    {errors.cvv && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">
                        {errors.cvv.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Billing Address Header */}
                <div className="flex items-center gap-1.5 pt-2 pb-1 border-b border-gray-50">
                  <Landmark size={14} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Billing Address
                  </span>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Innovation Way"
                    {...register("line1")}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                  />
                  {errors.line1 && (
                    <span className="text-xs text-red-500 font-medium mt-1 block">
                      {errors.line1.message}
                    </span>
                  )}
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="San Francisco"
                      {...register("city")}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                    />
                    {errors.city && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      placeholder="CA"
                      {...register("state")}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                    />
                    {errors.state && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Postal Code & Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Postal / ZIP Code
                    </label>
                    <input
                      type="text"
                      placeholder="94107"
                      {...register("postalCode")}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                    />
                    {errors.postalCode && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">
                        {errors.postalCode.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="United States"
                      {...register("country")}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                    />
                    {errors.country && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">
                        {errors.country.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isAdding}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAdding}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isAdding ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Add Card"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
