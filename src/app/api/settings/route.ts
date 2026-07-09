import connectDb from "@/src/lib/db";
import Settings from "@/src/model/setting.model";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { ownerId, businessName, supportEmail, knowledge } = await req.json()

        if (!ownerId) {
            return NextResponse.json({
                success: false,
                message: 'ownerId is required'
            }, {
                status: 400
            })
        }

        await connectDb()
        const setting = await Settings.findOneAndUpdate(
            { ownerId: ownerId },
            { ownerId, businessName, supportEmail, knowledge },
            { new: true, upsert: true }
        )

        return NextResponse.json({
            success: true,
            message: 'Settings updated successfully',
            setting
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'setting error',
            error
        }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const ownerId = url.searchParams.get("ownerId");

        if (!ownerId) {
             return NextResponse.json({
                success: false,
                message: 'ownerId is required'
            }, {
                status: 400
            })
        }

        await connectDb();
        const setting = await Settings.findOne({ ownerId });

        return NextResponse.json({
            success: true,
            setting
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'fetch setting error',
            error
        }, { status: 500 })
    }
}