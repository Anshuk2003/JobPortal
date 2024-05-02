import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validatejwt = async (request: NextRequest) => {
    try {
        // Extract the value of the "token" cookie from the request
        const currentToken = request.cookies.get("token")?.value;

        if (!currentToken) {
            throw new Error("Token not found")
        }

        // Verify the JWT using the secret key
        const decodedData: any = await jwt.verify(currentToken, process.env.JWT_SECRETE!)

        // Extract and return the user ID from the decoded JWT
        return decodedData.userId;
        
    } catch (error: any) {
        // If there's an error during token verification, throw an error with the message
        throw new Error(error.message);
    }
}