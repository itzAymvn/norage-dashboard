"use client";
import { User } from "@/app/types";

import toast from "react-hot-toast";
import { useTransition } from "react";
import { useState } from "react";
import { updateUserCommands } from "@/app/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const Commands = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();
    const [commands, setCommands] = useState(user.commands);

    const updateCommands = async () => {
        if (commands < 0) {
            toast.error("Commands cannot be less than 0");
            return;
        }

        const data = await updateUserCommands(user, commands);

        if (data?.success) {
            toast.success(
                `Successfully updated commands for ${user.discord?.username}`
            );
        } else {
            toast.error("Failed to update commands");
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <form>
                <label className="text-white">Commands</label>
                <input
                    type="number"
                    className="bg-gray-800 text-white border p-4 rounded-lg mb-4 w-full"
                    value={commands}
                    min={0}
                    onChange={(e) => {
                        setCommands(parseInt(e.target.value));
                    }}
                />

                <button
                    className={
                        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" +
                        (isPending || commands === user.commands
                            ? " opacity-50 cursor-not-allowed"
                            : "")
                    }
                    disabled={isPending || commands === user.commands}
                    type="submit"
                    onClick={() => {
                        startTransition(updateCommands);
                    }}
                >
                    Update Commands
                    <FontAwesomeIcon icon={faEdit} className="ml-2" />
                </button>
            </form>
        </div>
    );
};

export default Commands;
