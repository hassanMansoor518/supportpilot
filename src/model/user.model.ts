import mongoose from "mongoose";

export interface IUser {
    _id?: string;
    name: string;
    username?: string;
    email: string;
    password?: string;
    image?: string;
    provider?: string;
    role?: string;
    emailVerified?: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    bio?: string;
    phone?: string;
    socialLinks?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true, trim: true },
    username: { type: String, trim: true, unique: true, sparse: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: false },
    image: { type: String, required: false },
    provider: { type: String, default: 'credentials' },
    role: { type: String, default: 'user' },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, required: false },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpire: { type: Date, required: false },
    bio: { type: String, required: false },
    phone: { type: String, required: false },
    socialLinks: {
        twitter: { type: String },
        github: { type: String },
        linkedin: { type: String },
    },
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
