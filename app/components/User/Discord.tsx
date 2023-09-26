"use client";

import Image from "next/image";
import { User } from "@/app/types";
import { UpdateUserDiscord } from "@/app/actions";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Discord = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();
    const [discordID, setDiscordID] = useState(user.discord_id);

    const updateDiscord = async () => {
        const { success, message } = await UpdateUserDiscord(
            user._id,
            discordID
        );

        if (!success) {
            toast.error(message);
        } else {
            toast.success(message);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 w-full">
            <Image
                src={user.discord?.avatarURL || "/discord.png"}
                alt="Discord Logo"
                width={100}
                height={100}
                priority
                className="rounded-lg"
                blurDataURL="/discord.png"
            />
            <div className="flex-grow p-4 h-full flex flex-col justify-center bg-gray-800 rounded-lg shadow-md w-full sm:w-1/2">
                <label className="text-white text-lg font-semibold">
                    Discord{" "}
                    <a
                        href={`https://discord.com/users/${user?.discord_id}`}
                        className="text-blue-500 hover:text-blue-400 transition duration-200 ease-in-out"
                    >
                        [{user?.discord?.username}]
                    </a>
                </label>
                <div className="relative">
                    <input
                        className="w-full p-1 text-lg text-white placeholder-gray-400 rounded-md focus:ring focus:ring-blue-300 bg-gray-800 border-2 border-gray-700"
                        type="text"
                        placeholder="Minecraft UUID"
                        value={discordID}
                        onChange={(e) => setDiscordID(e.target.value)}
                    />
                    <button
                        className="absolute inset-y-0 right-0 px-2 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                        type="button"
                        onClick={() => {
                            startTransition(updateDiscord);
                        }}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="animate-spin"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faPenToSquare} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Discord;
