import PaymentModel, { IPayment } from "../model/payment.model";

export class PaymentRepository {
  async create(paymentData: Partial<IPayment>): Promise<IPayment> {
    return PaymentModel.create(paymentData);
  }

  async findByUserId(userId: string): Promise<IPayment[]> {
    return PaymentModel.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findByStripePaymentIntentId(stripePaymentIntentId: string): Promise<IPayment | null> {
    return PaymentModel.findOne({ stripePaymentIntentId });
  }

  async updateStatus(stripePaymentIntentId: string, status: string): Promise<IPayment | null> {
    return PaymentModel.findOneAndUpdate(
      { stripePaymentIntentId },
      { status },
      { new: true }
    );
  }
}

export const paymentRepository = new PaymentRepository();
