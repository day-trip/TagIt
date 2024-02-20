"use client";
import React from "react";
import FullDiv from "react-div-100vh";

export default function AuthLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <FullDiv className="w-screen flex justify-center items-center overflow-hidden">
        <div className="px-1 w-full sm:px-0 max-w-sm">
            <div className="rounded-lg bg-white shadow-sm p-6">
                {children}
            </div>
        </div>
    </FullDiv>
}
