import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/db";
import User from "@/model/user.model";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDb();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists with this email" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            provider: "credentials"
        });

        return NextResponse.json({ message: "User registered successfully", user: { id: newUser._id, email: newUser.email } }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ message: "An error occurred during registration", error: error.message }, { status: 500 });
    }
}
