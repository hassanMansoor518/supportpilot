import mongoose, { Document, Schema } from "mongoose";

export interface IAuditLog extends Document {
  user?: mongoose.Types.ObjectId;
  action: string;
  details: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    details: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

auditLogSchema.index({ user: 1 });
auditLogSchema.index({ action: 1 });

const AuditLogModel =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", auditLogSchema);

export default AuditLogModel;
