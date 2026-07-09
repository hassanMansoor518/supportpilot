import connectDb from "@/src/lib/db";
import Settings from "@/src/model/setting.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const { ownerId } = await req.json()

        if (!ownerId) {
            return NextResponse.json({
                success: false,
                message: 'ownerId is required'
            })
        }

        await connectDb()
        const setting = await Settings.findOne({ ownerId })
        if (!setting) {
            return NextResponse.json({
                success: false,
                message: 'Settings not found'
            })
        }
        return NextResponse.json({
            success: true,
            message: 'Settings fetched successfully',
            setting
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'setting error',
            error
        })
    }
}