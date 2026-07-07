import mongoose from "mongoose"

interface IUser {
    _id?: string,
    name?: string,
    email: string,
    password?: string,
    avater?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new mongoose.Schema<IUser>({
    _id: { type: String, required: true },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avater: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;



