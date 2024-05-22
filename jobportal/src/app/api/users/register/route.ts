import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import bcrypt from "bcryptjs"
import { message } from "antd";
import { sendMail } from "@/helpers/mailer";

//whenever this file is accessed it will execute connectDb
connectDB();


// it will recieve request from the client so whenever client going to send request to register then return nextResponse
export async function POST(request: NextRequest) {
    try {

        //check if user is already exist or not
        const reqBody = await request.json();

        const user = await User.findOne({ email: reqBody.email })
        if (user) {
            throw new Error("User already exists");
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;

        //create user
        const newUser= await User.create(reqBody);
        await sendMail({email:reqBody.email, emailType: "VERIFY", userId: newUser._id})

        return NextResponse.json(
            { message: "User created Successfully", success: true },
            { status: 201 }
        )
    }
    catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}