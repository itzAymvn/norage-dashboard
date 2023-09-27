"use client";

// React
import { useState, useTransition } from "react";

// Next Auth
import { signIn } from "next-auth/react";

// Next
import { useRouter } from "next/navigation";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Loginform = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async () => {
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

        const dashboardUrl: string = new URL(
            "/dashboard",
            process.env.NEXT_PUBLIC_BASE_URL
        ).href;

        router.refresh();
        router.push(dashboardUrl);
    };
    return (
        <div className="space-y-4 w-full">
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
                className={
                    "w-full h-12 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300" +
                    (isPending || !email || !password
                        ? " opacity-50 cursor-not-allowed"
                        : "")
                }
                onClick={() => startTransition(handleSubmit)}
                disabled={isPending || !email || !password}
            >
                {isPending ? (
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                    />
                ) : (
                    <>
                        <span className="mr-2">Sign In</span>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </>
                )}
            </button>
            {error && (
                <div className="w-full h-12 text-lg font-semibold text-white bg-red-600 rounded-lg flex items-center justify-center border border-red-700 opacity-80">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Loginform;
