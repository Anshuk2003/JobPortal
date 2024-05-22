import { connectDB } from "@/config/dbConfig";
import { validatejwt } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest) {
    try {
      validatejwt(request);
  
      // fetch query string parameters
      const { searchParams } = new URL(request.url);
      const user = searchParams.get("user");
      const searchText = searchParams.get("searchText");
      // console.log("Backend:", searchText)
      const filtersObject: any = {};
      if (user) {
        filtersObject["user"] = user;
      }
  
      if (searchText && searchText !== "") {
        const keywords = searchText.split(',').map(keyword => keyword.trim())
        // console.log('Keywords:', keywords);
        filtersObject['description'] = { $regex: keywords.join('|'), $options: 'i' };
      }
      // console.log(filtersObject)
      const jobs = await Job.find(filtersObject).populate("user");
      return NextResponse.json({
        message: "Jobs fetched successfully",
        data: jobs,
      });
    } catch (error: any) {
      // console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }