"use client";

import Image from "next/image";
import { User } from "@/app/types";
import { UpdateUserMinecraft } from "@/app/actions";
import { useTransition, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const Minecraft = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();
    const [muuid, setMuuid] = useState(user.minecraft_uuid);

    const updateMincraft = async () => {
        const { success, message } = await UpdateUserMinecraft(user._id, muuid);

        if (!success) {
            toast.error(message);
        } else {
            toast.success(message);
        }
    };
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 w-full">
            <Image
                src={user.minecraft?.avatarURL || "/minecraft.png"}
                alt="Minecraft Logo"
                width={100}
                height={100}
                priority
                className="rounded-lg"
                blurDataURL="/steve.png"
            />
            <div className="flex-grow p-4 h-full flex flex-col justify-around bg-gray-800 rounded-lg shadow-md w-full sm:w-1/2">
                <label className="text-white text-lg font-semibold">
                    Minecraft{" "}
                    <a
                        href={`https://discord.com/users/${user?.minecraft_uuid}`}
                        className="text-blue-500 hover:text-blue-400 transition duration-200 ease-in-out"
                    >
                        [{user?.minecraft?.name}]
                    </a>
                </label>
                <div className="relative">
                    <input
                        className="w-full p-1 text-lg text-white placeholder-gray-400 rounded-md focus:ring focus:ring-blue-300 bg-gray-800 border-2 border-gray-700"
                        type="text"
                        placeholder="Minecraft UUID"
                        value={muuid}
                        onChange={(e) => setMuuid(e.target.value)}
                    />
                    <button
                        className={
                            "absolute inset-y-0 right-0 px-2 py-1 text-white rounded-r-md hover:bg-blue-600" +
                            (isPending || muuid === user.minecraft_uuid
                                ? " cursor-not-allowed"
                                : "")
                        }
                        type="button"
                        disabled={isPending || muuid === user.minecraft_uuid}
                        onClick={() => {
                            startTransition(updateMincraft);
                        }}
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

export default Minecraft;
