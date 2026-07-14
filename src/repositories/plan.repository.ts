import Plan, { IPlan } from "../model/plan.model";

export class PlanRepository {
  async findAllActive(): Promise<IPlan[]> {
    return Plan.find({ isActive: true });
  }

  async findById(id: string): Promise<IPlan | null> {
    return Plan.findById(id);
  }

  async findBySlug(slug: string): Promise<IPlan | null> {
    return Plan.findOne({ slug, isActive: true });
  }

  async create(planData: Partial<IPlan>): Promise<IPlan> {
    return Plan.create(planData);
  }

  async update(id: string, planData: Partial<IPlan>): Promise<IPlan | null> {
    return Plan.findByIdAndUpdate(id, planData, { new: true });
  }

  async delete(id: string): Promise<IPlan | null> {
    return Plan.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}

export const planRepository = new PlanRepository();
