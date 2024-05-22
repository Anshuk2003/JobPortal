import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { message } from "antd";

//whenever this file is accessed it will execute connectDb
connectDB();


// it will recieve request from the client so whenever client going to send request to register then return nextResponse
export async function POST(request: NextRequest) {
    try {

        //check if user exist or not
        const reqBody = await request.json();
        const user = await User.findOne({ email: reqBody.email })
        if (!user) {
            throw new Error("User does not exists");
        }
        
        //compare passwords
        const validPassword = await bcrypt.compare(
            reqBody.password,
            user.password
        );

        if (!validPassword) {
            throw Error("Check your Credentials");
        }

        //create token
        const dataToBeSigned = {
            userId: user._id,
            email: user.email,
        }

        const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRETE!, {
            expiresIn: "1d",
        });

            // Return success message and set token as cookie
            const response = NextResponse.json(
                { message: "Login successful" },
                { status: 200 }
            );

            response.cookies.set("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000, // 1 day expiration
            });
            return response;
    }
    catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}