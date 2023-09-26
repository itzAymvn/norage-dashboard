"use client";

import { User } from "@/app/types";
import { UpdatePremium } from "@/app/actions";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";

const Premium = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();
    const [isChecked, setIsChecked] = useState(user.premium);

    const togglePremium = async () => {
        const data = await UpdatePremium(user.discord_id, !isChecked);

        if (data?.success) {
            toast.success(
                `Successfully ${
                    !isChecked ? "enabled" : "disabled"
                } premium for ${user.discord?.username}`
            );
            setIsChecked(!isChecked);
        } else {
            toast.error("Failed to update premium status");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-white">Premium User</label>
            <div className="flex items-center">
                <button
                    className={`${
                        isChecked ? "bg-green-500" : "bg-gray-400"
                    } relative inline-block w-10 h-6 rounded-full transition-transform duration-300 ease-in-out`}
                    onClick={() => {
                        startTransition(togglePremium);
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

export default Premium;
