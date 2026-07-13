import { delay, getPaymentMethods, updatePaymentMethods } from "./mockDb";
import { PaymentMethod, CardBrand } from "../types/PaymentMethod";

export const paymentService = {
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await delay(400);
    return getPaymentMethods();
  },

  addPaymentMethod: async (card: {
    cardNumber: string;
    expiryDate: string; // MM/YY
    cvv: string;
    cardholderName: string;
    billingAddress: {
      line1: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  }): Promise<PaymentMethod> => {
    await delay(1200);

    const [monthStr, yearStr] = card.expiryDate.split("/");
    const expiryMonth = parseInt(monthStr, 10) || 12;
    const expiryYear = 2000 + (parseInt(yearStr, 10) || 28);
    const last4 = card.cardNumber.slice(-4) || "4242";

    // Deduce card brand from first digit
    let brand: CardBrand = "visa";
    if (card.cardNumber.startsWith("5")) brand = "mastercard";
    else if (card.cardNumber.startsWith("3")) brand = "amex";
    else if (card.cardNumber.startsWith("6")) brand = "discover";

    const currentMethods = getPaymentMethods();
    const newPM: PaymentMethod = {
      id: `pm_${Math.random().toString(36).substring(2, 10)}`,
      brand,
      last4,
      expiryMonth,
      expiryYear,
      isDefault: currentMethods.length === 0, // default if first card
      cardholderName: card.cardholderName,
      billingAddress: card.billingAddress
    };

    updatePaymentMethods([...currentMethods, newPM]);
    return newPM;
  },

  deletePaymentMethod: async (id: string): Promise<void> => {
    await delay(600);
    const currentMethods = getPaymentMethods();
    const pmToDelete = currentMethods.find(p => p.id === id);
    let updated = currentMethods.filter(p => p.id !== id);

    // If we deleted the default, set another default
    if (pmToDelete?.isDefault && updated.length > 0) {
      updated[0].isDefault = true;
    }

    updatePaymentMethods(updated);
  },

  setDefault: async (id: string): Promise<PaymentMethod[]> => {
    await delay(600);
    const currentMethods = getPaymentMethods();
    const updated = currentMethods.map(p => ({
      ...p,
      isDefault: p.id === id
    }));
    updatePaymentMethods(updated);
    return updated;
  }
};
