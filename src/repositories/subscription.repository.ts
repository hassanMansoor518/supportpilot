import SubscriptionModel, { ISubscription } from "../model/subscription.model";

export class SubscriptionRepository {
  async findByUserId(userId: string): Promise<ISubscription | null> {
    return SubscriptionModel.findOne({ user: userId }).populate("plan");
  }

  async findByStripeSubscriptionId(stripeSubscriptionId: string): Promise<ISubscription | null> {
    return SubscriptionModel.findOne({ stripeSubscriptionId }).populate("plan");
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<ISubscription | null> {
    return SubscriptionModel.findOne({ stripeCustomerId }).populate("plan");
  }

  async create(subscriptionData: Partial<ISubscription>): Promise<ISubscription> {
    return SubscriptionModel.create(subscriptionData);
  }

  async update(id: string, subscriptionData: Partial<ISubscription>): Promise<ISubscription | null> {
    return SubscriptionModel.findByIdAndUpdate(id, subscriptionData, { new: true }).populate("plan");
  }

  async updateByStripeSubscriptionId(
    stripeSubscriptionId: string,
    subscriptionData: Partial<ISubscription>
  ): Promise<ISubscription | null> {
    return SubscriptionModel.findOneAndUpdate(
      { stripeSubscriptionId },
      subscriptionData,
      { new: true }
    ).populate("plan");
  }
}

export const subscriptionRepository = new SubscriptionRepository();
