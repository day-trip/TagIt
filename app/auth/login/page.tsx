"use client";

import {useEffect, useState} from "react";
import {loginUser, registerUser} from "@/app/auth/actions";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const login = async () => {
        console.log(email, password);
        const code = await loginUser(email, password);
        if (code === "-1") {
            setEmailError("User not found");
        }
        else if (code === "-2") {
            setPasswordError("Incorrect password");
        }
        else {
            localStorage.session = code;
            console.log("GGz!");
            router.push("/");
        }
    }

    useEffect(() => {
        setEmailError(null);
        setPasswordError(null);
    }, [email, password]);

    return <>
        <h1 className="text-black font-semibold mb-8 text-2xl">Login</h1>

        <p className="text-sm font-semibold text-gray-800 mb-0.5">Email</p>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="you@company.com" className="w-full p-2 ring-orange-400 focus:ring-orange-300 ring-2 rounded-md shadow-sm focus:outline-none focus:placeholder-gray-300 placeholder-gray-400"/>
        {emailError && <p className="text-red-500 text-sm font-semibold mt-0.5">{emailError}</p>}

        <p className="text-sm font-semibold text-gray-800 mb-0.5 mt-6">Password</p>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" className="w-full p-2 ring-orange-400 focus:ring-orange-300 ring-2 rounded-md shadow-sm focus:outline-none"/>
        {passwordError && <p className="text-red-500 text-sm font-semibold mt-0.5">{passwordError}</p>}

        <button onClick={login} className="mt-6 w-full rounded-md shadow-sm bg-orange-500 enabled:hover:bg-orange-400 disabled:opacity-60 text-white py-2.5 text-lg font-semibold">Continue</button>
    </>
}
