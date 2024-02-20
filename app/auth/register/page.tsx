"use client";

import {useState} from "react";
import {registerUser} from "@/app/auth/actions";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async () => {
        console.log(email, password);
        await registerUser(email, password);
    }

    return <>
        <h1 className="text-black font-semibold mb-8 text-2xl">Sign Up</h1>

        <p className="text-sm font-semibold text-gray-800 mb-0.5">Email</p>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="you@company.com" className="mb-6 w-full p-2 ring-orange-400 focus:ring-orange-300 ring-2 rounded-md shadow-sm focus:outline-none focus:placeholder-gray-300 placeholder-gray-400"/>

        <p className="text-sm font-semibold text-gray-800 mb-0.5">Password</p>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" className="mb-6 w-full p-2 ring-orange-400 focus:ring-orange-300 ring-2 rounded-md shadow-sm focus:outline-none"/>

        <p className="text-sm font-semibold text-gray-800 mb-0.5">Confirm password</p>
        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" name="passwordConfirm" className="mb-8 w-full p-2 ring-orange-400 focus:ring-orange-300 ring-2 rounded-md shadow-sm focus:outline-none"/>

        <button disabled={confirmPassword !== password || password.length < 8 || !/[^@]+@[^.]+\..+/.test(email)} onClick={register} className="w-full rounded-md shadow-sm bg-orange-500 enabled:hover:bg-orange-400 disabled:opacity-60 text-white py-2.5 text-lg font-semibold">Continue</button>
    </>
}
