import { NextRequest, NextResponse } from "next/server";
import { validatejwt } from "./helpers/validateJWT";

export async function middleware(request: NextRequest) {
    try {
        // Check if the requested page is a public page
        const path = request.nextUrl.pathname

        const isPublicPage = path === '/login' || path === '/register'

       // console.log("Request Pathname:", request.nextUrl.pathname);

        // Retrieve the JWT token from the request cookies
        const token = request.cookies.get('token')?.value

        //if there is a token (i.e user is logged in) and page is public then redirect to home page
        if (isPublicPage && token ) {
            return NextResponse.redirect(new URL("/", request.nextUrl))
        }

        //console.log("Token:", token);
        // If no token is found i.e user is not logged  and the page is not public, redirect to the login page
        if (!isPublicPage && !token) {
            return NextResponse.redirect(new URL("/login", request.nextUrl))
        }
        // If the user is authenticated or the page is public, continue to the next middleware
        return NextResponse.next();

    }
    catch (error: any) {
        console.error("Middleware error:", error);
        return NextResponse.error();
    }
}

// Configuration for the middleware, specifying the routes to match
export const config = {
    matcher: [
     "/",
     "/login", 
     "/register",
     ],
};