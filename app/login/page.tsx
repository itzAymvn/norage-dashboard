"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) return setError("Please fill in all fields.");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            return setError(
                result.error === "CredentialsSignin"
                    ? "Invalid credentials."
                    : result.error
            );
        }

        console.log("Signed in successfully! Redirecting...");

        const dashboardUrl: string = new URL(
            "/dashboard",
            process.env.NEXT_PUBLIC_BASE_URL
        ).href;

        router.refresh();
        router.push(dashboardUrl);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg opacity-90 flex flex-col items-center space-y-6 md:w-96">
                <img
                    src="/logo.png"
                    alt="NoRage Logo"
                    width={100}
                    height={100}
                    className="mb-4"
                />
                <h1 className="text-4xl font-bold text-white mb-2 text-center">
                    NoRage
                </h1>
                <p className="text-lg font-semibold text-gray-300 mb-6 text-center">
                    Please sign in to continue.
                </p>
                <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            className="w-full h-12 px-4 py-2 text-lg text-black placeholder-gray-400 border rounded-lg focus:ring focus:ring-blue-300"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <input
                            className="w-full h-12 px-4 py-2 text-lg text-black placeholder-gray-400 border rounded-lg focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full h-12 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
                        type="submit"
                    >
                        Sign In
                    </button>
                    {error && (
                        <div className="w-full h-12 text-lg font-semibold text-white bg-red-600 rounded-lg flex items-center justify-center border border-red-700 opacity-80">
                            {error}
                        </div>
                    )}
                </form>

                <p className="mt-4 text-lg font-semibold text-gray-300 text-center">
                    Made with ❤️
                </p>
            </div>
        </div>
    );
};

export default Page;
