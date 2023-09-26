"use client";

import { User } from "@/app/types";
import { updateBugHunter } from "@/app/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

const Bughunter = ({ user, setUser }: { user: User; setUser: any }) => {
    const [isPending, startTransition] = useTransition();

    const toggleBugHunter = async () => {
        const data = await updateBugHunter(user.discord_id, !user.bug_hunter);

        if (data?.success) {
            setUser({
                ...user,
                bug_hunter: !user.bug_hunter,
            });

            toast.success(data?.message);
        } else {
            toast.error(data?.message);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-white">Bug Hunter</label>
            <div className="flex items-center">
                <button
                    className={`${
                        user.bug_hunter ? "bg-blue-500" : "bg-gray-400"
                    } relative inline-block w-10 h-6 rounded-full transition-transform duration-300 ease-in-out`}
                    onClick={() => {
                        startTransition(toggleBugHunter);
                    }}
                    disabled={isPending}
                >
                    <div
                        className={`${
                            user.bug_hunter ? "translate-x-4" : "translate-x-0"
                        } absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out`}
                    ></div>
                </button>
                <span className="text-white ml-2">
                    {user.bug_hunter ? "Yes" : "No"}
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
