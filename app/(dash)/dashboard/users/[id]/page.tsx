"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Achievement {
    name: string;
    description: string;
    date: Date | string;
}

interface User {
    _id: string;
    discord_id: string;
    discord_avatar: string;
    discord_name: string;
    minecraft_uuid: string;
    minecraft_name: string;
    minecraft_avatar: string;
    bug_hunter: boolean;
    achievements: Achievement[];
}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const [user, setUser] = useState<User | null>(null);
    const [editedUUID, setEditedUUID] = useState<string>(user?.minecraft_uuid!);
    const [editedID, setEditedID] = useState<string>(user?.discord_id!);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleSaveUserInformation = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editedID || !editedUUID)
            return setError("Please fill out all fields.");

        const res = await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                discord_id: editedID,
                minecraft_uuid: editedUUID,
            }),
        });

        const data = await res.json();
        if (data.error) {
            setError(data.error);
            return;
        }

        // Update the user
        setUser(data);
        setError(null);
    };

    useEffect(() => {
        setIsLoading(true);

        const getUser = async () => {
            const res = await fetch(`/api/users/${id}`);
            const data = await res.json();
            return data;
        };

        getUser().then((data) => {
            if (!data?._id) {
                setIsLoading(false);
                return;
            }
            // Fetch the discord name & minecraft name
            Promise.all([
                fetch(`/api/discord/users/${data.discord_id}`),
                fetch(`/api/minecraft/${data.minecraft_uuid}`),
            ]).then(async ([discordRes, minecraftRes]) => {
                const [discordData, minecraftData] = await Promise.all([
                    discordRes.json(),
                    minecraftRes.json(),
                ]);

                // Update the user with the new data
                const updatedUser = {
                    ...data,
                    discord_name: discordData.username || "Invalid ID",
                    discord_avatar: discordData.avatarURL,
                    minecraft_name: minecraftData.name || "Invalid UUID",
                    minecraft_avatar: minecraftData.avatar,
                };

                // Return the updated user
                setUser(updatedUser);
                setEditedID(updatedUser.discord_id);
                setEditedUUID(updatedUser.minecraft_uuid);
                setIsLoading(false);
            });
        });
    }, [id]);

    return isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <svg
                className="animate-spin h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0
                        014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    ) : (
        (user && (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                    <div className="p-4 flex flex-col items-center justify-center w-100 md:w-1/2 bg-gray-700 rounded-lg shadow-md">
                        <img
                            src={user.discord_avatar || "/discord.png"}
                            alt="Discord Avatar"
                            className="rounded-full w-32 h-32"
                        />
                        <h1 className="text-2xl font-bold">
                            {user.discord_name}
                        </h1>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center w-100 md:w-1/2 bg-gray-700 rounded-lg shadow-md">
                        <img
                            src={user.minecraft_avatar || "/steve.png"}
                            alt="Minecraft Avatar"
                            className="rounded-full w-32 h-32"
                        />
                        <h1 className="text-2xl font-bold">
                            {user.minecraft_name}
                        </h1>
                    </div>
                </div>

                {/* Change UUID & ID */}
                <div className="p-4 bg-gray-700 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">User Info</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <form onSubmit={handleSaveUserInformation}>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="discord_id"
                                        className="text-gray-300"
                                    >
                                        Discord ID
                                    </label>
                                    <input
                                        type="text"
                                        name="discord_id"
                                        id="discord_id"
                                        className="bg-gray-800 text-white border p-4 rounded-lg"
                                        value={editedID}
                                        onChange={(e) =>
                                            setEditedID(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="minecraft_uuid"
                                        className="text-gray-300"
                                    >
                                        Minecraft UUID
                                    </label>
                                    <input
                                        type="text"
                                        name="minecraft_uuid"
                                        id="minecraft_uuid"
                                        className="bg-gray-800 text-white border p-4 rounded-lg"
                                        value={editedUUID}
                                        onChange={(e) =>
                                            setEditedUUID(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-lg p-4 mt-4 hover:bg-blue-600 transition duration-200 ease-in-out"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>

                {user?.achievements?.length > 0 && (
                    <div className="p-4 bg-gray-700 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4">
                            Achievements [{user.achievements.length}]
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {user.achievements.map((achievement) => (
                                <Link
                                    href={`/dashboard/users/${
                                        user._id
                                    }/achievements/${achievement.name.replace(
                                        / /g,
                                        "-"
                                    )}`}
                                    key={achievement.name}
                                    className="bg-gray-800 p-4 rounded-lg shadow-md"
                                >
                                    <h1 className="text-xl font-bold mb-2 text-gray-100">
                                        {achievement.name}
                                    </h1>
                                    <p className="text-gray-300">
                                        {achievement.description}
                                    </p>
                                    <p className="text-gray-300">
                                        {new Date(
                                            achievement.date
                                        ).toLocaleDateString()}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )) || (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-gray-400">User not found.</p>
                <Link
                    href="/dashboard/users"
                    className="bg-blue-500 text-white rounded-lg p-4 mt-4 hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                    Go Back
                </Link>
            </div>
        )
    );
}
