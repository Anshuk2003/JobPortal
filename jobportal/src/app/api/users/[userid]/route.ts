import { connectDB } from "@/config/dbConfig";
import { validatejwt } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest,{params}:any) {
  try {
    validatejwt(request)
    const user = await User.findById(params.userid).select("-password");
    if (!user) {
      throw new Error("No user found");
    }
    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}