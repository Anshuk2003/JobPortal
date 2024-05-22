"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Verifymail() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            // console.log("Sending token to API:", token);
            const response=await axios.post("/api/users/verifyemail", { token });
            // console.log("API Response:", response.data);
            setVerified(true)
            setError(false)
        } catch (error: any) {
            setError(true)
            console.log("Error verifying email:", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])
    return (
        <div className='container1'>
            <h1 className='title1'>Verify Email</h1>

            <h2 className='token1'>
                {token ? `${token}` : "No token Found"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <div className='verified'>
                    <Link href="/login" className='link1'>
                        Login
                    </Link>
                </div>
                </div>
            )}
            {error && (
                <div className='error1'>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}

