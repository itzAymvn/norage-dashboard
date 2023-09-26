"use client";
import { User } from "@/app/types";

import toast from "react-hot-toast";
import { useTransition } from "react";
import { useState } from "react";
import { updateUserCommands } from "@/app/actions";

const Commands = ({ user, setUser }: { user: User; setUser: any }) => {
    const [isPending, startTransition] = useTransition();
    const [commands, setCommands] = useState(user.commands);

    const updateCommands = async () => {
        const data = await updateUserCommands(user.discord_id, commands);

        if (data?.success) {
            setUser({
                ...user,
                commands: commands,
            });

            toast.success(
                `Successfully updated commands for ${user.discord_name}`
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
                    onChange={(e) => {
                        setCommands(parseInt(e.target.value));
                    }}
                />

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    disabled={isPending}
                    type="submit"
                    onClick={() => {
                        startTransition(updateCommands);
                    }}
                >
                    Update Commands
                </button>
            </form>
        </div>
    );
};

export default Commands;
