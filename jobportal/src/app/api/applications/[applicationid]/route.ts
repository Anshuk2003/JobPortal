import { connectDB } from "@/config/dbConfig";
import { sendEmail } from "@/helpers/sendEmail";
import { validatejwt } from "@/helpers/validateJWT";
import Application from "@/models/appliactionModel";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request:NextRequest,{params}:any) {
    try {
        validatejwt(request);
        const reqBody= await request.json();
        const application:any=await Application.findByIdAndUpdate(params.applicationid,reqBody,{
            new:true,
            runValidators:true,
        }).populate("user").populate({
            path:"job",
            populate:{
                path:"user"
            },
        })

        await sendEmail({
            to: application.user.email,
            subject:"Your application Status has been updated",
            text:`Your application Status has been updated to ${application.status}`,
            html:`<div>
            <p>Your application Status has been updated to ${application.status}</p>
            <p>
            Company: ${application.job.user.name}
            </p>
            <p>
            Job Title: ${application.job.title}
            </p>
            <p>
            Applied on: ${moment(application.createdAt).format("DD/MM/YYY")}
            </p>
            <p>Thank you for using JobHunt</p>
            </div>`

        })
        return NextResponse.json({
            message:"Application Status Updated Successfully",
            data:application,
        })
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
    
}