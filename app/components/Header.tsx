"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800">
            <Link className="flex items-center space-x-4" href="/dashboard">
                <Image
                    src="/logo.png"
                    alt="NoRage Logo"
                    width={48}
                    height={48}
                />
            </Link>
            <div className="flex items-center space-x-4">
                {/* <button
                    className="text-white hover:text-gray-300"
                    onClick={() => router.push("/dashboard")}
                >
                    Dashboard
                </button>
                <button
                    className="text-white hover:text-gray-300"
                    onClick={() => router.push("/dashboard/settings")}
                >
                    Settings
                </button>
                <button
                    className="text-white hover:text-gray-300"
                    onClick={() => router.push("/dashboard/commands")}
                >
                    Commands
                </button> */}
                <div className="flex items-center space-x-2">
                    <div
                        className="flex items-center justify-center bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-600"
                        onClick={() => signOut()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
