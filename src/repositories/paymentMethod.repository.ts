import PaymentMethodModel, { IPaymentMethod } from "../model/paymentMethod.model";

export class PaymentMethodRepository {
  async findByUserId(userId: string): Promise<IPaymentMethod[]> {
    return PaymentMethodModel.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
  }

  async findById(id: string): Promise<IPaymentMethod | null> {
    return PaymentMethodModel.findById(id);
  }

  async findByStripePaymentMethodId(stripePaymentMethodId: string): Promise<IPaymentMethod | null> {
    return PaymentMethodModel.findOne({ stripePaymentMethodId });
  }

  async findDefaultByUserId(userId: string): Promise<IPaymentMethod | null> {
    return PaymentMethodModel.findOne({ user: userId, isDefault: true });
  }

  async create(pmData: Partial<IPaymentMethod>): Promise<IPaymentMethod> {
    return PaymentMethodModel.create(pmData);
  }

  async update(id: string, pmData: Partial<IPaymentMethod>): Promise<IPaymentMethod | null> {
    return PaymentMethodModel.findByIdAndUpdate(id, pmData, { new: true });
  }

  async delete(id: string): Promise<IPaymentMethod | null> {
    return PaymentMethodModel.findByIdAndDelete(id);
  }

  async deleteByStripePaymentMethodId(stripePaymentMethodId: string): Promise<IPaymentMethod | null> {
    return PaymentMethodModel.findOneAndDelete({ stripePaymentMethodId });
  }

  async unsetDefaultsExcept(userId: string, activeId: string): Promise<void> {
    await PaymentMethodModel.updateMany(
      { user: userId, _id: { $ne: activeId } },
      { isDefault: false }
    );
  }
}

export const paymentMethodRepository = new PaymentMethodRepository();
