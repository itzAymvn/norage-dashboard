"use client";

import { signOut } from "next-auth/react";
import { useTransition } from "react";

const Signout = () => {
    const [isPending, startTransition] = useTransition();

    const logoff = () => {
        signOut();
    };

    return (
        <div
            className="flex items-center justify-center bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-600"
            onClick={() => {
                startTransition(logoff);
            }}
        >
            {isPending ? (
                <div className="mr-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default Signout;
