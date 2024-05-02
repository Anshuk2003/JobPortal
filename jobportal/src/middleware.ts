import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    try {
        // Check if the requested page is a public page
        const isPublicPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register";
        //console.log("Request Pathname:", request.nextUrl.pathname);

        // Retrieve the JWT token from the request cookies
        const token = request.cookies.get("token")?.value;

        //console.log("Token:", token);
        // If no token is found i.e user is not logged  and the page is not public, redirect to the login page
        if (!token && !isPublicPage) {
            return NextResponse.redirect(new URL("/login", request.nextUrl))
        }

        //if there is a token (i.e user is logged in) and page is public then redirect to home page
        if (token && isPublicPage) {
            return NextResponse.redirect(new URL("/", request.nextUrl))
        }

        // If the user is authenticated or the page is public, continue to the next middleware
        return NextResponse.next();

    }
    catch (error: any) {
        return NextResponse.error();
    }
}

// Configuration for the middleware, specifying the routes to match
export const config = {
    matcher: ["/", "/login", "/register"]
};