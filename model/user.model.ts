import mongoose from "mongoose"

interface IUser {
    name?: string,
    email: string,
    password?: string,
    avater?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new mongoose.Schema<IUser>({
    name: String,
    email: String,
    password: String,
    avater: String,
    createdAt: Date,
    updatedAt: Date,
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;



