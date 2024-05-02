import { connectDB } from "@/config/dbConfig";
import { validatejwt } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        // Validate the JWT token from the request and get decoded data
        const userId = await validatejwt(request);

        // Find the user by ID in the database and exclude the password field
        const user = await User.findById(userId).select("-password");

        if (!user) {
            throw new Error("No user found")
        }

        // Return a JSON response with the user data
        return NextResponse.json({
            message: "user data fetched successfully",
            data: user
        })
    }
    catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}