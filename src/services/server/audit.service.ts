import { auditLogRepository } from "../../repositories/auditLog.repository";
import { IAuditLog } from "../../model/auditLog.model";

export class AuditService {
  async log(userId: string | undefined, action: string, details: any): Promise<IAuditLog> {
    const detailsStr = typeof details === "object" ? JSON.stringify(details) : String(details);
    return auditLogRepository.createLog(userId, action, detailsStr);
  }

  async getLogs(userId: string): Promise<IAuditLog[]> {
    return auditLogRepository.findByUserId(userId);
  }
}

export const auditService = new AuditService();
