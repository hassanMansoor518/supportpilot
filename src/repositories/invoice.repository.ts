import InvoiceModel, { IInvoice } from "../model/invoice.model";

export interface InvoiceQueryParams {
  userId: string;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export class InvoiceRepository {
  async findInvoices(params: InvoiceQueryParams) {
    const {
      userId,
      search,
      status,
      startDate,
      endDate,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = params;

    // Find subscription ids for the user
    const SubscriptionModel = (await import("../model/subscription.model")).default;
    const userSubscriptions = await SubscriptionModel.find({ user: userId }).select("_id");
    const subIds = userSubscriptions.map((s) => s._id);

    const query: any = {
      subscription: { $in: subIds },
    };

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    if (search) {
      query.invoiceNumber = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const [invoices, total] = await Promise.all([
      InvoiceModel.find(query)
        .populate("subscription")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      InvoiceModel.countDocuments(query),
    ]);

    return {
      invoices,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<IInvoice | null> {
    return InvoiceModel.findById(id).populate("subscription");
  }

  async findByStripeInvoiceId(stripeInvoiceId: string): Promise<IInvoice | null> {
    return InvoiceModel.findOne({ stripeInvoiceId }).populate("subscription");
  }

  async create(invoiceData: Partial<IInvoice>): Promise<IInvoice> {
    return InvoiceModel.create(invoiceData);
  }

  async update(id: string, invoiceData: Partial<IInvoice>): Promise<IInvoice | null> {
    return InvoiceModel.findByIdAndUpdate(id, invoiceData, { new: true });
  }

  async upsertByStripeInvoiceId(
    stripeInvoiceId: string,
    invoiceData: Partial<IInvoice>
  ): Promise<IInvoice> {
    const existing = await InvoiceModel.findOne({ stripeInvoiceId });
    if (existing) {
      const updated = await InvoiceModel.findByIdAndUpdate(existing._id, invoiceData, { new: true });
      return updated!;
    }
    return InvoiceModel.create({ ...invoiceData, stripeInvoiceId });
  }
}

export const invoiceRepository = new InvoiceRepository();
