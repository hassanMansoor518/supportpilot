import AuditLogModel, { IAuditLog } from "../model/auditLog.model";

export class AuditLogRepository {
  async createLog(userId: string | undefined, action: string, details: string): Promise<IAuditLog> {
    const userObjectId = userId ? (await import("mongoose")).default.Types.ObjectId.createFromHexString(userId) : undefined;
    return AuditLogModel.create({
      user: userObjectId,
      action,
      details,
    });
  }

  async findByUserId(userId: string): Promise<IAuditLog[]> {
    return AuditLogModel.find({ user: userId }).sort({ createdAt: -1 });
  }
}

export const auditLogRepository = new AuditLogRepository();
