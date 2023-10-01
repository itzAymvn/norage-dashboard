"use client";

import { User } from "@/app/types";
import { updateBugHunter } from "@/app/actions/User";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";

const Bughunter = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();
    const [isChecked, setIsChecked] = useState(user.bug_hunter);

    const toggleBugHunter = async () => {
        const data = await updateBugHunter(user);

        if (data?.success) {
            toast.success(
                `Successfully ${
                    !isChecked ? "enabled" : "disabled"
                } bug hunter for ${user.discord?.username}`
            );

            setIsChecked(!isChecked);
        } else {
            toast.error(data?.message);
        }
    };

    return (
        <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg shadow-md">
            <label className="text-white">Bug Hunter</label>
            <div className="flex items-center">
                <button
                    className={`${
                        isChecked ? "bg-blue-500" : "bg-gray-400"
                    } relative inline-block w-10 h-6 rounded-full transition-transform duration-300 ease-in-out`}
                    onClick={() => {
                        startTransition(toggleBugHunter);
                    }}
                    disabled={isPending}
                >
                    <div
                        className={`${
                            isChecked ? "translate-x-4" : "translate-x-0"
                        } absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out`}
                    ></div>
                </button>
                <span className="text-white ml-2">
                    {isChecked ? "Yes" : "No"}
                </span>

                {isPending && (
                    <div className="ml-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-600"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bughunter;
